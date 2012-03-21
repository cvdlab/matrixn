
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
  
 }(this));