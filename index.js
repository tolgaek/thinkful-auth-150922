'use strict';

var express = require('express');

var app = express();

app.get('/', function(req, res, next) {
  res.send('Hello');
});

app.listen(8060);
