/**
 * Route <domain>/cost/all
 *
 * Returns all costs of a user
 */

const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }

      //building response
      dbConnection.getByUser('cost', decoded.user, function(err, items) {
        if(err) {
          return res.status(500).send({error: 'Database connection has failed'});
        }
        items.forEach(it => {
          it.id = it._id;
          delete it._id;
        });
        return res.status(200).send(items);
      });
    });
  });
};