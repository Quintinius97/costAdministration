'use strict';
var express = require('express');

var app = express();

//require('./router')(app);
/*
 var mysql = require('mysql');
 var connection = mysql.createConnection(
 config.get('./config/dbConfig.json','connection')
 );
 connection.connect(function(err) {
 if (err) {
 console.error('error connecting: ' + err.stack);
 return;
 }
 console.log('connected as id ' + connection.threadId);
 });

 */

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});