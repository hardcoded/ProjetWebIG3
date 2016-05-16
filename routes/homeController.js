module.exports.controller = function(app, auth) {
  /* GET home page */
  app.get('/', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        res.status(200);
        res.render('pages/index', {title: 'Infotech', authenticated: true});
      },
      fail: function() {
        res.status(200);
        res.render('pages/index', {title: 'Infotech', authenticated: false});
      }
    });
  });
}
