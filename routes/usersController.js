module.exports.controller = function(app, DAOs) {
  /* GET user  */
  app.get('/user', app.requiresLogin, function (req, res) {
    res.render('pages/userInfos', {
      title: "User",
      user: req.user
    });
  });
}
