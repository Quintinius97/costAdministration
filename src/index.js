'use strict';
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

require('./router')(app);

console.log(require('./helpers/jwt').create('testing'));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});