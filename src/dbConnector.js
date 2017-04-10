'use strict';
let Db = require('tingodb')().Db;
let db = new Db('./data', {});

let category = db.collection("category.db");
let cost = db.collection("cost.db");
let user = db.collection("user.db");

module.exports.insert = function(db, jsonObj, cb) {
  switch(db) {
    case 'category':
      //categoryDB.insert(jsonObj, true).where('id', jsonObj['id']);     
      category.createIndex({"name": 1}, {unique: true});
     category.insert({"name":"test","test":"a"},  function (err){
       if(err){console.log("err");}else{console.log("success");}cb(err);}

  
     
     );
    break;
    case 'cost':
      //costDB.insert(jsonObj, true).where('id', jsonObj['id']);
      break;
    case 'user':
      //userDB.insert(jsonObj, true).where('userName', jsonObj['userName']);
      break;
  }
};


module.exports.createDB = function() {
  //category.drop(function() {
    category = db.createCollection("category.db", {autoIndexId: false},
        function() {
          category.createIndex({"name": 1}, {unique: true}, function() {
            category.insert({"name":"test"});
            category.insert({"name":"test"});
          });
        });
  //});

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