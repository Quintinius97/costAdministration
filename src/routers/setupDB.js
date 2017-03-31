module.exports = function(app, route) {
  app.route(route)
  .get(function(req, res) {
    require('../dbConnector').createDB();
  })
};