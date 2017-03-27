const noSql = require('nosql');
let categoryDB = noSql.load('./data/category.nosql');
let costDB = noSql.load('./data/cost.nosql');
let userDB = noSql.load('./data/user.nosql');

module.exports.insert = function (db, JsonObj) {
  switch (db) {
    case 'category':
        console.log(JsonObj);
        console.log(JsonObj['id']);
        categoryDB.insert(JsonObj, true).where('id',JsonObj['id']);

      break;
    case 'cost':

      break;
    case 'user':

      break;
    default:

  }
  // body...
};
