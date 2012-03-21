
/*!
 * mat
 * JavaScript dimension-independent Matrix library
 * Copyright (c) 2012 Enrico Marino (http://onirame.no.de)
 * MIT License
 */

 !(function (exports) {

  /**
   * Library namespace.
   */

  var mat = exports.mat = {};

  /**
   * Library version.
   */

  mat.version = '0.0.2';

  /** 
   * Mat
   *
   * @param {Number} n number of rows
   * @param {Number} m number of cols
   * @return {mat.Mat} matrix `n`x`m`
   * @api public
   */

  mat.Mat = function (rows, cols) {
    this.n = n;
    this.m = m;
    this.v = new Float32Array(n*m);
  };

  /**
   * getRow
   * get the i-th row
   *
   * @param {Number} i index of the row to get
   * @return {Float32Array} `i`-th row
   * @api public
   */

  mat.Mat.prototype.getRow = function (i) {
    var cols = this.m;
    var begin = i * cols;
    var end = begin + cols;
    return this.v.subarray(begin, end);
  };

  /**
   * setRow
   * set the i-th row
   *
   * @param {Number} i index of the row to get
   * @param {Float32Array} row row
   * @return {mat.Mat} this for chaining
   * @api public
   */

  mat.Mat.prototype.setRow = function (i, row) {
    var cols = this.m;
    var begin = i * cols;
    this.v.set(row, begin);
    return this;
  };
  
  /**
   * forEach
   * apply iterator for each row of the matrix
   * 
   * @param {Function} iterator iterator
   *   @param {Float32Array} row the i-th row to iterate
   *   @param {Number} i the index of the row to iterate
   * @return {mat.Mat} this for chaining
   * @api public
   */

  mat.Mat.prototype.forEach = function (iterator) {
    var mat = this.v;
    var rows = this.n;
    var cols = this.m;
    var begin = 0;
    var end;
    var row;
    var i;
    
    for (i = 0; i < rows; i += 1) {
      begin = i * cols;
      end = begin + cols;
      row = new Float32Array(mat.subarray(begin, end));
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
   * @return {mat.Mat} filtered rows
   * @api public
   */

  mat.Mat.prototype.filter = function (iterator) {
    var mat = this.v;
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
      row = mat.subarray(begin, end);
      test = iterator(row, i);
      if (test) {
        begin = k * cols;
        end = begin + cols;
        filtered.set(begin, end);
        k += 1;
      }
    }

    result = new mat.Mat(k, cols);
    result.v.set(filtered.subarray(0, k * cols));

    return result;
  };

  /**
   * map
   * apply iterator for each row of the matrix
   * 
   * @param {Function} iterator iterator
   *   @param {Float32Array} row the i-th row to iterate
   *   @param {Number} i the index of the row to iterate
   * @return {mat.Mat} the mapped matrix
   * @api public
   */

  mat.Mat.prototype.map = function (iterator) {
    var mat = this.v;
    var rows = this.n;
    var cols = this.m;
    var begin = 0;
    var end;
    var row;
    var i;

    for (i = 0; i < rows; i += 1) {
      begin = i * cols;
      end = begin + cols;
      row = mat.subarray(begin, end);
      iterator(row, i);
    }

    return this;
  };


  /**
   * rotate
   * 
   * @param {Array} dims
   * @param {Number} angle
   * @return {mat.Mat} this for chaining
   * @api public
   */

  mat.Mat.prototype.rotate = function (dims, angle) {
    var mat = this.v;
    var rows = this.n;
    var cols = this.m;
    var length = rows * cols;
    var cos_a = cos(angle);
    var sin_a = sin(angle);
    var r_ii = cos_a;
    var r_ij = -sin_a;
    var r_ji = sin_a;
    var r_jj = cos_a;
    var d_i = dims[0];
    var d_j = dims[1];
    var i;
    var j;
    var v_i;
    var v_j;
    var k;

    for (k = 0; k < length; k += cols) {
      i = k + d_i;
      j = k + d_j;
      v_i = mat[i];
      v_j = mat[j];
      mat[i] = v_i * r_ii + v_j * r_ij;
      mat[j] = v_i * r_ji + v_j * r_jj;
    }
    
    return this;
  };

}(this));