
/*!
 * matrixn
 * JavaScript dimension-independent matrix library
 * Copyright (c) 2012 Enrico Marino and Federico Spini
 * MIT License
 */

/**
 * Library namespace.
 */

var matrixn = exports;

/**
 * Library version.
 */

matrixn.version = '0.0.5';

/** 
 * Mat
 *
 * @param {Number} n number of rows
 * @param {Number} m number of cols
 * @return {mat.Mat} matrix `n`x`m`
 * @api public
 */

matrixn.Matrix = function (rows, cols) {
  this.n = n;
  this.m = m;
  this.data = new Float32Array(n*m);
};

/**
 * getRow
 * get the i-th row
 *
 * @param {Number} i index of the row to get
 * @return {Float32Array} `i`-th row
 * @api public
 */

matrixn.Matrix.prototype.getRow = function (i) {
  var cols = this.m;
  var begin = i * cols;
  var end = begin + cols;

  return this.data.subarray(begin, end);
};

/**
 * setRow
 * set the i-th row
 *
 * @param {Number} i index of the row to get
 * @param {Float32Array} row row
 * @return {matrixn.Matrix} this for chaining
 * @api public
 */

matrixn.Matrix.prototype.setRow = function (i, row) {
  var cols = this.m;
  var begin = i * cols;
  
  this.data.set(row, begin);

  return this;
};

/**
 * forEach
 * apply iterator for each row of the matrix
 * 
 * @param {Function} iterator iterator
 *   @param {Float32Array} row the i-th row to iterate
 *   @param {Number} i the index of the row to iterate
 * @return {matrixn.Matrix} this for chaining
 * @api public
 */

matrixn.Matrix.prototype.forEach = function (iterator) {
  var data = this.data;
  var rows = this.n;
  var cols = this.m;
  var begin = 0;
  var end;
  var row;
  var i;
  
  for (i = 0; i < rows; i += 1) {
    begin = i * cols;
    end = begin + cols;
    row = new Float32Array(data.subarray(begin, end));
    iterator(row, i);
  }

  return this;
};

/**
 * filter
 * filter the rows that pass the iterator test
 * 
 * @param {Function} iterator iterator
 *   @param {Float32Array} row the i-th row to iterate
 *   @param {Number} i the index of the row to iterate
 * @return {matrixn.Matrix} filtered rows
 * @api public
 */

matrixn.Matrix.prototype.filter = function (iterator) {
  var data = this.data;
  var rows = this.n;
  var cols = this.m;
  var begin = 0;
  var end;
  var row;
  var i;
  var test;
  var filtered = new Float32Array(rows * cols);
  var k = 0;

  for (i = 0; i < rows; i += 1) {
    begin = i * cols;
    end = begin + cols;
    row = data.subarray(begin, end);
    test = iterator(row, i);
    if (test) {
      begin = k * cols;
      end = begin + cols;
      filtered.set(begin, end);
      k += 1;
    }
  }

  result = new matrixn.Matrix(k, cols);
  result.data.set(filtered.subarray(0, k * cols));

  return result;
};

/**
 * map
 * apply iterator for each row of the matrix
 * 
 * @param {Function} iterator iterator
 *   @param {Float32Array} row the i-th row to iterate
 *   @param {Number} i the index of the row to iterate
 * @return {matrixn.Matrix} the mapped matrix
 * @api public
 */

matrixn.Matrix.prototype.map = function (iterator) {
  var data = this.data;
  var rows = this.n;
  var cols = this.m;
  var begin = 0;
  var end;
  var row;
  var i;

  for (i = 0; i < rows; i += 1) {
    begin = i * cols;
    end = begin + cols;
    row = data.subarray(begin, end);
    iterator(row, i);
  }

  return this;
};


/**
 * rotate
 * 
 * @param {Array} dims
 * @param {Number} angle
 * @return {matrixn.Matrix} this for chaining
 * @api public
 */

matrixn.Matrix.prototype.rotate = function (dims, angle) {
  var data = this.data;
  var rows = this.n;
  var cols = this.m;
  var length = rows * cols;
  var cos_a = cos(angle);
  var sin_a = sin(angle);
  var d_i = dims[0];
  var d_j = dims[1];
  var r_ii = cos_a;
  var r_ij = -sin_a;
  var r_ji = sin_a;
  var r_jj = cos_a;
  var i;
  var j;
  var v_i;
  var v_j;
  var k;

  for (k = 0; k < length; k += cols) {
    i = k + d_i;
    j = k + d_j;
    v_i = data[i];
    v_j = data[j];
    data[i] = v_i * r_ii + v_j * r_ij;
    data[j] = v_i * r_ji + v_j * r_jj;
  }
  
  return this;
};

/**
 * scale
 * 
 * @param {Array|Uint32Array} dims
 * @param {Array|Float32Array} values
 * @return {matrixn.Matrix} this for chaining
 * @api public
 */

matrixn.Matrix.prototype.scale = function (dims, values) {
  var data = this.data; 
  var rows = this.rows;
  var cols = this.cols;
  var length = dims.length;
  var i;
  var j;

  for (i = 0; i < rows; i++) {
    for (j = 0; j < length; j++) {
      data[i * cols + dims[j]] *= values[j]; 
    }
  }

  return this;
};

/**
 * translate
 * 
 * @param {Array|Uint32Array} dims
 * @param {Array|Float32Array} values
 * @return {matrixn.Matrix} this for chaining
 * @api public
 */

matrixn.Matrix.prototype.translate = function (dims, values) {
  var data = this.data; 
  var rows = this.rows;
  var cols = this.cols;
  var length = dims.length;
  var i;
  var j;

  for (i = 0; i < rows; i++) {
    for (j = 0; j < length; j++) {
      data[i * cols + dims[j]] += values[j]; 
    }
  }

  return this;
};