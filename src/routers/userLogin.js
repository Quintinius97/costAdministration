const crypto = require('../helpers/cryptography');
const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .post(bodyParser, function(req, res) {
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
    body.username = req.body.username;
    body.password = req.body.password;
    if(body.username === undefined || body.password === undefined) {
      return res.status(422).send(
          {error: 'Missing required fields'});
    }

    //Checking whether the user does exist
    dbConnection.get('user', body.username, function(err, item) {
      if(err) {
        return res.status(410).send({error: 'User does not exist'});
      }
      //Checking whether the provided pw does match
      crypto.comparePassword(body.password, item.pw_hash, function(err, isPasswordMatch) {
        if(err || !isPasswordMatch) {
          return res.status(401).send({error: 'Password does not match'});
        } else {
          //Creating the Auth Token
          let token = jwt.create(body.username);
          if(token === null || token === undefined) {
            return res.status(500).send({error: 'Token generation has failed'});
          }
          return res.status(201).send({
            info: 'Token has been successfully created',
            jwt: token
          });
        }
      });
    });
  });
};
