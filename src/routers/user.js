const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');
const crypto = require('../helpers/cryptography');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .post(bodyParser, function(req, res) {

    if(req.get('authorization')===undefined || req.get('authorization')===null) {
      return res.status(401).send({error: 'Authorization required'});
    }
    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }
      //Checking the content-type
      if(req.get('content-type') !== 'application/json') {
        return res.status(406).send(
            {error: 'Content-Type not allowed. Server does only consume application/json'});
      }

      //Checking whether request body is missing
      if(!req.body) {
        return res.status(400).send(
            {error: 'Request body is missing'});
      }

      //Checking all required values and removing additional ones to prevent DB dumping
      let body = {};
      body.name = req.body.name;
      body.password = req.body.password;
      if(body.name === undefined && body.password === undefined) {
        return res.status(422).send(
            {error: 'Missing required fields'});
      }

      dbConnection.get('user', decoded.user, function(err, item) {
        if(err) {
          return res.status(500).send({error: 'User Update has failed'});
        }
        if(body.name === undefined) {
          body.name = item.name;
        }
        if(body.password === undefined) {
          body.pw_hash = item.pw_hash;
        } else {
          body.pw_hash = crypto.cryptPasswordSync(body.password);
        }
      });
      //Update User in DB
      dbConnection.delete('user', decoded.user, function(err) {
        if(err) {
          return res.status(500).send({error: 'User Update has failed'});
        }
        dbConnection.insert('user', {
          name: body.name,
          username: decoded.user,
          pw_hash: body.pw_hash
        }, function(err) {
          if(err) {
            return res.status(500).send({error: 'User Update has failed'});
          }
          return res.status(200).send({info: 'User has been successfully updated'});
        })
      });
    });
  });
};
