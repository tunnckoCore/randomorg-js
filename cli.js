#!/usr/bin/env node
'use strict';
var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');
var parseCodeContext = require('./index');
var fs = require('fs');
var isLine = argv.line || argv.l;
var isFile = argv.file || argv.f;

function read(src) {
  return fs.readFileSync(src,'utf-8');
}

function help() {
  return [
    pkg.description,
    '',
    'Options',
    '  --help | -h  show help',
    '  --line | -l  specify which line to parse',
    '  --file | -f  file that want to parse',
    '',
    'Example',
    '  $ jsCodeContext -f ./test/fixture.js -l 6',
    '  //=> array with one object'
  ].join('\n');
}

if (argv.help || argv.h) {
  console.log(help());
  return;
}

if (argv.version || argv.v) {
  console.log(pkg.version);
  return;
}

if (isFile && isLine) {
  var context = read(isFile);
  var result = parseCodeContext.sync(context, isLine);
} else if (isFile && !isLine) {
  var context = read(isFile);
  var result = parseCodeContext.sync(context);
} else {
  var result = help();
}

console.log(result);
