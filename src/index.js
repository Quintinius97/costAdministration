'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./dbConnector').insert('user',
    {name: "Hans Msadeier", userName: "myUserName", pw_hash: "asdfasdf"}
);

require('./router')(app);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});