'use strict';
module.exports = function (app) {
  //User Routers:
  var user = '/user';

  app.route(user + '/login')
  .post(function (req, res) {
    //TODO
  });

  app.route(user + '/register')
  .post(function (req, res) {
    //TODO
  });

  //Cost Routers:
  var cost = '/cost';
  
  app.route(cost)
  .get(function (req, res) {
    //TODO
  })
  .post(function (req, res) {
    //TODO
  })
  .delete(function (req, res) {
    //TODO
  });

  app.route(cost + '/all')
  .get(function (req, res) {
    //TODO
  });

  //Category Routers:
  var category = '/category';

  app.route(category)
  .post(function (req, res) {
    //TODO
  });

  app.route(category+'/all')
  .get(function (req, res) {
    //TODO
  });

  app.route(category+'/:catId')
  .get(function (req, res) {
    var catId = req.params.catId;
    //TODO
  })
  .delete(function (req, res) {
    var catId = req.params.catId;
    //TODO
  });
};