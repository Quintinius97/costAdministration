const config = require('./helpers/config');
const noSql = require('nosql');
let categoryDB = noSql.load('./data/category.nosql');
let costDB = noSql.load('./data/cost.nosql');
let userDB = noSql.load('./data/user.nosql');
