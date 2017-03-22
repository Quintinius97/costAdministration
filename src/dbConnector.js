var config = require('./helpers/config');
var mysql = require('mysql');

var connection = config('./config/dbConfig','connection');
var pool = mysql.createPool(
  config('./config/dbConfig','connection')
);

pool.getConnection(function(err, connection) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});