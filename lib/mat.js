
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
      row = mat.subarray(begin, end);
      iterator(row, i);
    }

    return this;
  };

 }(this));