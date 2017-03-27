module.exports = function(app, route) {
  app.route(route)
    .post(function(req, res) {
      userName = req.body.userName;
      password = req.body.password;
      // TODO
    });
};
