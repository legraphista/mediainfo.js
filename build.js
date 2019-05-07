#!/usr/bin/env node
const path = require('path');
const https = require('https');
const fs = require('fs');

const urls = require('./urls');
const paths = require('./paths');

const download = (file, url) => {
  const ws = fs.createWriteStream(file);

  return new Promise((res, rej) => {
    const request = https.get(url, function (response) {
      if (response.statusCode !== 200) {
        return rej(new Error(`Url ${url} responded with code ${response.statusCode}`));
      }
      response.pipe(ws);

      response.once('end', (e) => {
        console.log(`Downloaded ${url} to ${file}`);
        return res(e);
      });
      response.once('error', rej);
    });


    request.once('error', rej);
  })
};

Promise.all([
  download(paths.WASM.js, urls.WASM.js),
  download(paths.WASM.wasm, urls.WASM.wasm),

  download(paths.JS.js, urls.JS.js),
  download(paths.JS.mem, urls.JS.mem),
]).catch(e => {
  console.error(e);
  console.error('Failed to download MediaInfoLib files!');
  process.exit(1);
}).then(() => {
  console.log('Finished downloading MediaInfoLib files!')
});
