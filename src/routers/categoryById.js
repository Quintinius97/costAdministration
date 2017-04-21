/**
 * Route <domain>/category/<id>
 *
 * Returns category of a user by Id
 */

const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    let catId = req.params.catId;

    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }
      //getting item from db
      dbConnection.get('category', catId, function(err, item) {
        if(err) {
          console.log(err);
          return res.status(500).send({error: 'Database connection has failed'});
        }
        if(item===undefined || item ===null) {
          return res.status(404).send({error: 'Requested Id does not exist'});
        }
        if(item.username !== decoded.user) {
          return res.status(401).send({error: 'Permission denied'});
        }
        item.id = item._id;
        delete item._id;
        delete username;
        return res.status(200).send(item);
      });
    });
  })
  .delete(function(req, res) {
    let catId = req.params.catId;
    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }
      //getting item from db
      dbConnection.get('category', catId, function(err, item) {
        if(err) {
          return res.status(500).send({error: 'Database connection has failed'});
        }
        if(item===undefined || item ===null) {
          return res.status(404).send({error: 'Requested Id does not exist'});
        }
        if(item.username !== decoded.user) {
          return res.status(401).send({error: 'Permission denied'});
        }
        //deleting Item
        dbConnection.delete('category', costId, function(err, item) {
          if(err) {
            return res.status(500).send({error: 'Database connection has failed'});
          }
          return res.status(200).send({info: "Cost successfully deleted"});
        });
      });
    });
  });
};