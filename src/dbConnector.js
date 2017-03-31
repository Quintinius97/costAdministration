'use strict';
let Db = require('tingodb')().Db;
let db = new Db('./data', {});

let category = db.collection("category.db");
let cost = db.collection("cost.db");
let user = db.collection("user.db");

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

module.exports.createDB = function() {
  category.drop(function() {
    category = db.createCollection("category.db", {autoIndexId: false},
        function() {
          category.createIndex({"name": 1}, {unique: true}, function() {
          });
        });
  });

  user.drop(function() {
    user = db.createCollection("user.db", {autoIndexId: false}, function() {
      category.createIndex({"userName": 1}, {unique: true}, function() {
      });
    });
  });
  cost.drop(function() {
    cost = db.createCollection("cost.db", {autoIndexId: true}, function() {
    });
  });
};