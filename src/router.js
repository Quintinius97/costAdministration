'use strict';
module.exports = function(app) {
  // User Routers:
  const user = '/user';
  require('./routers/userLogin')(app, user + '/login');
  require('./routers/userRegister')(app, user + '/register');

  // Cost Routers:
  const cost = '/cost';
  require('./routers/costs')(app, cost);
  require('./routers/costAll')(app, cost + '/all');

  // Category Routers:
  const category = '/category';
  require('./routers/categories')(app, category);
  require('./routers/categoryAll')(app, category + '/all');
  require('./routers/categoryById')(app, category + '/:catId');

  // Setup
  require('./routers/setupDB')(app, '/sql/setup');
};
