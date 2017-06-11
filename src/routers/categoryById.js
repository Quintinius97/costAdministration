/**
 * Route <domain>/category/<id>
 *
 * Returns category of a user by Id
 */

const dbConnection = require('../dbConnector');
const jwt = require('../helpers/jwt');
const bodyParser = require('body-parser').json();

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    let catId = req.params.catId;

    if(req.get('authorization')===undefined || req.get('authorization')===null) {
      return res.status(401).send({error: 'Authorization required'});
    }
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
        if(item.username !== decoded.user && item.username!==undefined) {
          return res.status(401).send({error: 'Permission denied'});
        }
        item.id = item._id;
        delete item._id;
        delete item.username;
        return res.status(200).send(item);
      });
    });
  })
  // Update Category
  .post(bodyParser, function(req, res) {
    let catId = req.params.catId;
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
      body.name = req.body.name;
      body.color = req.body.color;
      body.desc = req.body.desc;
      if(body.name === undefined && body.color === undefined && body.desc === undefined) {
        return res.status(422).send(
            {error: 'Missing required fields'});
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
        if(item.isStd === 1) {
          return res.status(403).send({error: 'Standard Category cannot be modified'});
        }
        if(item.username !== decoded.user) {
          return res.status(401).send({error: 'Permission denied'});
        }
        body.username=item.username;

        if(body.name === undefined) {
          body.name = item.name;
        }
        if(body.color === undefined) {
          body.color = item.color;
        }
        if(body.desc === undefined) {
          body.desc = item.desc;
        }
        //Update Category in DB
        dbConnection.delete('category', catId, function(err) {
          if(err) {
            return res.status(500).send({error: 'Category Update has failed'});
          }
          dbConnection.insert('category', body, function(err) {
            if(err) {
              return res.status(500).send({error: 'Category Update has failed'});
            }
            return res.status(200).send({info: 'Category has been successfully updated'});
          });
        });
      });
    });
  })
  .delete(function(req, res) {
    let catId = req.params.catId;

    if(req.get('authorization')===undefined || req.get('authorization')===null) {
      return res.status(401).send({error: 'Authorization required'});
    }
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
        if(item.isStd === 1) {
          return res.status(403).send({error: 'Standard Category cannot be deleted'});
        }
        if(item.username !== decoded.user) {
          return res.status(403).send({error: 'Permission denied'});
        }
        //deleting Item
        dbConnection.delete('category', catId, function(err) {
          if(err) {
            return res.status(500).send({error: 'Database connection has failed'});
          }
          return res.status(200).send({info: "Cost successfully deleted"});
        });
      });
    });
  });
};