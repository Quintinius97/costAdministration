const config = require('./helpers/config');
const mysql = require('mysql');

const connection = config('./config/dbConfig','connection');
let pool = mysql.createPool(
  config('./config/dbConfig','connection')
);

pool.getConnection(function(err, connection) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});
