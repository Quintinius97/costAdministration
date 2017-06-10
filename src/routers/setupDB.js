/**
 * Route <domain>/setup/db
 *
 * Drops all databases and creates the standard categories
 */

const dbConnection = require('../dbConnector');
const standardCategories = [
  {
    name: "Holiday",
    color: "#FFCCCC",
    isStd: 1
  },
  {
    name: "Transport",
    desc: "Getting me from A to B",
    color: "#FFFFCC",
    isStd: 1
  },
  {
    name: "Clothing",
    color: "#CCFFCC",
    isStd: 1
  },
  {
    name: "Food & Drinks",
    color: "#CCFFFF",
    isStd: 1
  },
  {
    name: "Events",
    desc: "Musicals, Opera, Cinema, ...",
    color: "#CCCCFF",
    isStd: 1
  },
  {
    name: "Education",
    color: "#FFCCFF",
    isStd: 1
  }
];

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    dbConnection.createDB('user', function(err1) {
      if(err1) {
        return res.status(500).send({error: 'User DB creation failed'});
      }
      dbConnection.createDB('cost', function(err2) {
        if(err2) {
          return res.status(500).send({error: 'Cost DB creation failed'});
        }
        dbConnection.createDB('category', function(err3) {
          if(err3) {
            return res.status(500).send({error: 'Category DB creation failed'});
          }
          for(let cat in standardCategories) {
            dbConnection.insert('category', standardCategories[cat], function(err) {
              if(err) {
                return res.status(500).send({error: 'Standard Category creation failed'});
              }
              // eslint-disable-next-line eqeqeq
              if(cat == standardCategories.length - 1) {
                return res.status(200).send(
                    {info: 'DB creation finished successfully'});
              }
            });
          }
        });
      });
    });
  });
};
