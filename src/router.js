'use strict';
module.exports = function (app) {
  //User Routers:
  var user = '/user';
  require('./routers/userLogin')(app, user + '/login');
  require('./routers/userRegister')(app, user + '/register');

  //Cost Routers:
  var cost = '/cost';
  require('./routers/costs')(app, cost);
  require('./routers/costAll')(app, cost + '/all');

  //Category Routers:
  var category = '/category';
  require('./routers/categories')(app, category);
  require('./routers/categoryAll')(app, category + '/all');
  require('./routers/categoryById')(app, category + '/:catId');

  //Setup
  require('./routers/setupDB')(app, "/sql/setup");
};