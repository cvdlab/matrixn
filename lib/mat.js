
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

  mat.version = '0.0.1';

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

 }(this));