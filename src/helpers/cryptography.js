var bcrypt = require('bcrypt');

module.exports.cryptPassword = function(password, cb) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return cb(err);
    }
    bcrypt.hash(password, salt, function(err, hash) {
      cb(err, hash);
    });
  });
};

module.exports.cryptPasswordSync = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports.comparePassword = function(password, hash, cb) {
  bcrypt.compare(password, hash, cb);
};

module.exports.comparePasswordSync = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};