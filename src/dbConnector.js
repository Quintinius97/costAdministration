const noSql = require('nosql');
let categoryDB = noSql.load('./data/category.nosql');
let costDB = noSql.load('./data/cost.nosql');
let userDB = noSql.load('./data/user.nosql');

module.exports.insert = function(db, jsonObj) {
  switch(db) {
    case 'category':
      categoryDB.insert(jsonObj, true).where('id', jsonObj['id']);
      break;
    case 'cost':
      costDB.insert(jsonObj, true).where('id', jsonObj['id']);
      break;
    case 'user':
      userDB.insert(jsonObj, true).where('userName', jsonObj['userName']);
      break;
    default:

  }
};

module.exports.find = function(db, key, callback) {
  switch(db) {
    case 'category':

      break;
    case 'cost':

      break;
    case 'user':
      userDB.find().make(function(filter) {
        filter.where('userName', '=', key);
        filter.callback(function(err, res) {
          callback(err, res);
        });
      });
      break;
    default:
  }
};