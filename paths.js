/**
 Copyright Findie 2019
 Author: Stefan
 File: urls.js
 */
const urls = require('./urls');
const path = require('path');

const binDir = path.join(__dirname, 'bin');
const wasmDir = path.join(binDir, 'wasm');
const jsDir = path.join(binDir, 'js');

const WASM = {
  js: path.join(wasmDir, path.basename(urls.WASM.js)),
  wasm: path.join(wasmDir, path.basename(urls.WASM.wasm))
};

const JS = {
  js: path.join(jsDir, path.basename(urls.JS.js)),
  mem: path.join(jsDir, path.basename(urls.JS.mem))
};

module.exports = {
  WASM,
  JS
};

