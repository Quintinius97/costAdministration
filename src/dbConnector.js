'use strict';
let Db = require('tingodb')().Db;
let db = new Db('./data', {});

let category = db.collection("category.db");
let cost = db.collection("cost.db");
let user = db.collection("user.db");

module.exports.insert = function(db, jsonObj, cb) {
  switch(db) {
    case 'category':
      category.createIndex({"name": 1}, {unique: true});
      category.insert(jsonObj, function(err) {
            cb(err);
          }
      );
      break;
    case 'cost':
      cost.createIndex({"id": 1}, {unique: true});
      cost.insert(jsonObj, function(err) {
            cb(err);
          }
      );
      break;
    case 'user':
      user.createIndex({"username": 1}, {unique: true});
      user.insert(jsonObj, function(err) {
            cb(err);
          }
      );
      break;
  }
};

module.exports.get = function(db, key, cb) {
  switch(db) {
    case 'category':
      category.findOne({"name":key}, function(err, item)
        {cb(err, item);});
      break;
    case 'cost':
      cost.findOne({"id":key}, function(err, item)
        {cb(err, item);});
      break;
    case 'user':
      user.findOne({"username":key}, function(err, item)
        {cb(err, item);});
      break;
  }
};

module.exports.delete = function(db, key, cb) {
  switch(db) {
    case 'category':
      category.remove({"name":key}, {w:1}, function(err, result)
        {cb(err, result);});
      break;
    case 'cost':
      cost.remove({"id":key}, {w:1}, function(err, result)
        {cb(err, result);});
      break;
    case 'user':
      user.remove({"username":key}, {w:1}, function(err, result)
        {cb(err, result);});
      break;
  }
};

module.exports.createDB = function() {
  category.drop(function() {
    category = db.createCollection("category.db", {autoIndexId: false}, function() {
      category.createIndex({"name": 1}, {unique: true}, function() {
      });
    });
  });
  user.drop(function() {
    user = db.createCollection("user.db", {autoIndexId: false}, function() {
      category.createIndex({"username": 1}, {unique: true}, function() {
      });
    });
  });
  cost.drop(function() {
    cost = db.createCollection("cost.db", {autoIndexId: true}, function() {
    });
  });
};
