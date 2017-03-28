const bodyParser = require('body-parser').json();
const dbConnection = require('../dbConnector');

module.exports = function(app, route) {
  app.route(route)
  .post(bodyParser, function(req, res) {
    if(!req.body) {
      return res.sendStatus(422);
    }
    dbConnection.find('user', req.body.userName, function(err, res) {
      return res.sendStatus(422);
    });
  });
  // TODO
};
