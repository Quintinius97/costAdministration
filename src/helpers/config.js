"use strict";
module.exports = function (path, obj) {
  if (!path.endsWith('.json')) {
    path = path + ".json";
  }

  var fs = require('fs');
  var data = fs.readFileSync(path, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
  });

  var jsonObj = JSON.parse(data);
  var objs = obj.split('.');
  for (var entity in objs) {
    for (var i in jsonObj) {
      console.log(i);
      if (i == objs[entity]) {
        jsonObj = jsonObj[i];
        break;
      }
    }
  }
  return jsonObj;
};