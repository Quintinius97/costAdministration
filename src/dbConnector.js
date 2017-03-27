const config = require('./helpers/config');
const noSql = require('nosql');
let userDB = noSql.load(config('./config/dbConfig', 'user'));