'use strict';
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

require('./router')(app);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});