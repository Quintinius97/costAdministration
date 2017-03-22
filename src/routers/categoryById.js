module.exports=function (app, route) {
  app.route(route)
  .get(function (req, res) {
    var catId = req.params.catId;
    //TODO
  })
  .delete(function (req, res) {
    var catId = req.params.catId;
    //TODO
  });
};