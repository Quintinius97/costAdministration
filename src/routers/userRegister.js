const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');

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
    body.name = req.body.name;
    body.username = req.body.username;
    body.pw_hash = req.body.password;
    if(body.name === undefined || body.username === undefined || body.pw_hash === undefined) {
      return res.status(422).send(
          {error: 'Missing required fields'});
    }
    //Insert User into DB if not already existing
    dbConnection.insert('user', req.body, function(err) {
      if(err) {
        return res.status(422).send(
            {error: 'User does already exist'});
      } else {
        return res.status(200).send(
            {info: 'User has been successfully created'});
      }
    })
  });
};
