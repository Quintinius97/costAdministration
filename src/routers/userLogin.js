module.exports = function(app, route) {
  app.route(route)
    .post(function(req, res) {
      let userName = req.body.userName;
      let password = req.body.password;
      // TODO
    });
};
