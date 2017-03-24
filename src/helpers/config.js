'use strict';
module.exports = function(path, obj) {
  if (!path.endsWith('.json')) {
    path = path + '.json';
  }

  const fs = require('fs');
  let data = fs.readFileSync(path, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }
  });

  let jsonObj = JSON.parse(data);
  let objs = obj.split('.');
  for (let entity in objs) {
    for (let i in jsonObj) {
      if (i == objs[entity]) {
        jsonObj = jsonObj[i];
        break;
      }
    }
  }
  return jsonObj;
};