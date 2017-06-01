'use strict';
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
require('./router')(app);

app.listen(4000, function() {
  console.log('costAdministration API listening on port 4000!');
});
