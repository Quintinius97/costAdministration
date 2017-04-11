const dbConnection = require('../dbConnector');
const standardCategories = [
  {
    name: "Holiday"
  },
  {
    name: "Transport",
    desc: "Getting me from A to B"
  },
  {
    name: "Clothing"
  },
  {
    name: "Food & Drinks",
  },
  {
    name: "Events",
    desc: "Musicals, Opera, Cinema, ..."
  },
  {
    name: "Education"
  }
];

module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    dbConnection.createDB('category', function(err) {
      if(err) {
        return res.status(500).send({error: 'Category DB creation failed'});
      }
      for(let cat in standardCategories) {
        dbConnection.insert('category', standardCategories[cat], function(err) {
          if(err) {
            return res.status(500).send({error: 'Standard Category creation failed'});
          }
          if(cat == standardCategories.length - 1) {
            return res.status(200).send(
                {error: 'Standard Category creation finished successfully'});
          }
        });
      }
    });
  });
};