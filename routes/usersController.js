var requiresLogin = require('../requiresLogin');

module.exports.controller = function(app, DAOs) {
  /* GET user  */
  app.get('/user', requiresLogin, function (req, res) {
    res.render('pages/userInfos', {
      user: req.user
    });
  });
}
