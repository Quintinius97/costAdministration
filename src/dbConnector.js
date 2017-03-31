var Db = require('tingodb')().Db;


var db = new Db('./data', {});
var category = db.collection("category.db");
var cost = db.collection("cost.db");
var user = db.collection("user.db");

module.exports.insert = function(db, jsonObj) {
  switch(db) {
    case 'category':
      //categoryDB.insert(jsonObj, true).where('id', jsonObj['id']);      
      category.insert(jsonObj);
      break;
    case 'cost':
      //costDB.insert(jsonObj, true).where('id', jsonObj['id']);
      break;
    case 'user':
      //userDB.insert(jsonObj, true).where('userName', jsonObj['userName']);
      break;
    default:
      db.category.insert(jsonObj);
  }
};

// module.exports.find = function(db, key, callback) {
//   switch(db) {
//     case 'category':

//       break;
//     case 'cost':

//       break;
//     case 'user':
//       userDB.find().make(function(filter) {
//         filter.where('userName', '=', key);
//         filter.callback(function(err, res) {
//           callback(err, res);
//         });
//       });
//       break;
//     default:
//   }
//};