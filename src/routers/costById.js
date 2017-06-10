/**
 * Route <domain>/cost/<id>
 *
 * Returns cost of a user by Id
 */

const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    let costId = req.params.costId;
    if(req.get('authorization')===undefined || req.get('authorization')===null) {
      return res.status(401).send({error: 'Authorization required'});
    }

    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }
      console.log(costId);
      //getting item from db
      dbConnection.get('cost', costId, function(err, item) {
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
        delete item.username;
        return res.status(200).send(item);
      });
    });
  })
  // Update Cost
  .post(bodyParser, function(req, res) {
    let costId = req.params.costId;
    if(req.get('authorization')===undefined || req.get('authorization')===null) {
      return res.status(401).send({error: 'Authorization required'});
    }
    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }

      //Checking all required values and removing additional ones to prevent DB dumping
      let body = {};
      body.title = req.body.title;
      body.desc = req.body.desc;
      body.category = req.body.category;
      body.date = req.body.date;
      body.price = req.body.price;
      body.currency = req.body.currency;

      //getting item from db
      dbConnection.get('cost', costId, function(err, item) {
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
        if(body.title === undefined) {
          body.title = item.title;
        }
        if(body.desc === undefined) {
          body.desc = item.desc;
        }
        if(body.category === undefined) {
          body.category = item.category;
        }
        if(body.date === undefined) {
          body.date = item.date;
        }
        if(body.price === undefined) {
          body.price = item.price;
        }
        if(body.currency === undefined) {
          body.currency = item.currency;
        }
        //Update Category in DB
        dbConnection.delete('cost', costId, function(err) {
          if(err) {
            return res.status(500).send({error: 'Cost Update has failed'});
          }
          dbConnection.insert('cost', body, function(err) {
            if(err) {
              return res.status(500).send({error: 'Cost Update has failed'});
            }
            return res.status(200).send({info: 'Cost has been successfully updated'});
          });
        });
      });
    });
  })
  .delete(function(req, res) {
    let costId = req.params.costId;

    // Connect JWT
    jwt.connect(req.get('authorization'), function(err, decoded) {
      if(err || decoded === null || decoded === undefined) {
        return res.status(401).send({error: 'Invalid Token'});
      }
      console.log(costId);
      //getting item from db
      dbConnection.get('cost', costId, function(err, item) {
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
        dbConnection.delete('cost', costId, function(err, item) {
          if(err) {
            return res.status(500).send({error: 'Database connection has failed'});
          }
          return res.status(200).send({info: "Cost successfully deleted"});
        });
      });
    });
  });
};