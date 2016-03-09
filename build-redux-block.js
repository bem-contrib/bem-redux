'use strict';

var fs = require('fs');
var browserify = require('browserify');
var sourceFile = './common.blocks/redux/redux.source.js';
var targetFile = './common.blocks/redux/redux.js';

var b = browserify();
b.add(sourceFile);
b.bundle().pipe(fs.createWriteStream(targetFile));
