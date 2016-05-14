// If the page can't be accessed without login
var requiresLogin = require('./requiresLogin');

module.exports.controller = function(app, DAOs) {
  /* GET user  */
  app.get('/user', requiresLogin, function (req, res) {
    res.render('pages/userInfos', {
      title: "User",
      user: req.user
    });
  });
}
