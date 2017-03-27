var bcrypt = require('bcrypt');

module.exports.cryptPassword = function(password, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return callback(err);
    }

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

module.exports.cryptPasswordSync = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, isPasswordMatch) {
    if(err) {
      return callback(err);
    }
    return callback(null, isPasswordMatch);
  });
};

module.exports.comparePasswordSync = function(password, hash) {
  return bcrypt.compareSync(password, hash);
};