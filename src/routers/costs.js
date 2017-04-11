const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    // TODO
  })

  //Add new costs
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
      body.title = req.body.title;
      body.desc = req.body.desc;
      body.category = req.body.category;
      body.date = req.body.date;
      body.price = req.body.price;
      body.currency = req.body.currency;
      body.username = decoded.user;

      if(body.title === undefined || body.date === undefined
          || body.price === undefined || body.currency === undefined) {
        return res.status(422).send(
            {error: 'Missing required fields'});
      }

      // Verify category does exist
      dbConnection.get('category', body.category, function(err, item) {
        if(err) {
          return res.status(500).send({error: 'Database connection has failed'});
        }
        if(item === null || item === undefined || item.username !== decoded.user) {
          return res.status(410).send({error: 'Category does not exist'});
        }

        //Verify price and date are parsable
        body.price = parseFloat(body.price);
        if(isNaN(body.price)) {
          return res.status(422).send({error: 'Price has to be a valid number'});
        }
        body.date = parseInt(body.date);
        if(body.date < 946684800 || body.date > 7289654399) {
          return res.status(422).send(
              {error: 'Timestamp has to be a valid epoch timestamp between the 01-01-2000 and the 31-12-2200'});
        }

        //Insert cost into db
        dbConnection.insert('cost', body, function(err) {
          if(err) {
            return res.status(500).send({error: 'Database connection has failed'});
          }
          return res.status(200).send({info: 'Cost has been successfully created'});
        });
      });
    });
  })

  .delete(function(req, res) {
    // TODO
  });
};
