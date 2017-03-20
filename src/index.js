'use strict';
var debug = require('debug')('app');
var express = require('express');

var app = express();
debug("hello world");

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  debug('Example app listening on port 3000!');
});