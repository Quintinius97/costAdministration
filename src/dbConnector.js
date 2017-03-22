var config = require('./helpers/config');
var mysql = require('mysql');
var pool = mysql.createPool(
  config('./config/dbConfig','connection')
);