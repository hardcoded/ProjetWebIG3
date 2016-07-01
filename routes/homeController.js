module.exports.controller = function(app, auth, DAOs) {
  /* GET home page */
  app.get('/', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.userDAO.getById(id, {
          success : function(user) {
            res.status(200);
            res.render('pages/index', {title: 'Infotech', authenticated: true, isAdmin: user.admin});
          },
          fail : function(err) {
            res.render('pages/error');
          }
        });
      },
      fail: function() {
        res.status(200);
        res.render('pages/index', {title: 'Infotech', authenticated: false});
      }
    });
  });
}
