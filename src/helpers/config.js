'use strict';
module.exports = function(path, obj) {
  if(!path.endsWith('.json')) {
    path = path + '.json';
  }

  const fs = require('fs');
  let data = fs.readFileSync(path, 'utf8', function(err, data) {
    if(err) {
      return console.error(err);
    }
  });

  let jsonObj = JSON.parse(data);
  let objs = obj.split('.');
  for(let i = 0; i < objs.length; i++) {
    for(let j = 0; j < jsonObj.length; j++) {
      if(j === objs[i]) {
        jsonObj = jsonObj[j];
        break;
      }
    }
  }
  return jsonObj;
};
