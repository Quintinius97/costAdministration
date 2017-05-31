'use strict';
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

require('./router')(app);

app.listen(4000, function() {
  console.log('costAdministration API listening on port 3000!');
});
