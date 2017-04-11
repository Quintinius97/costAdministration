const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .post(bodyParser, function(req, res) {

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
      body.color = req.body.color;
      body.desc = req.body.desc;
      body.username = decoded.user;

      if(body.name === undefined || body.color === undefined) {
        return res.status(422).send(
            {error: 'Missing required fields'});
      }

      //Verify color is parsable
      var htmlColor = new RegExp('#((0-9A-Fa-f){6}|((0-9A-Fa-f){3})');
      if(!body.color.match(htmlColor)) {
        return res.status(422).send({error: 'Color has to be in a valid color format e.g: #07ffcc'});
      }

      // Verify category does not exist
      dbConnection.get('category', body.name, function(err, item) {
        if(err) {
          return res.status(500).send({error: 'Database connection has failed'});
        }
        if((item !== null && item !== undefined) &&
            (item.username === decoded.user || item.username === undefined)) {
          return res.status(422).send({error: 'Category does already exist'});
        }

        //Insert cost into db
        dbConnection.insert('category', body, function(err) {
          if(err) {
            return res.status(500).send({error: 'Database connection has failed'});
          }
          return res.status(200).send({info: 'Category has been successfully created'});
        });
      });
    });
  });
};
