'use strict';
const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

let teet = require('./dbConnector');
// teet.createDB();
teet.insert(
    'category',
    {name: 'Hans Msadeier', userName: 'myUserName', pw_hash: 'asdfasdf'},
    (err) => console.log(err ? 'err' : 'success'));
teet.insert(
    'category',
    {name: 'Hans Msadeier', userName: 'myUserName', pw_hash: 'asdfasdf'},
    (err) => console.log(err ? 'err' : 'success'));
require('./router')(app);

app.listen(
    3000, function() { console.log('Example app listening on port 3000!'); });