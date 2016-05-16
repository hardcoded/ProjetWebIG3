
module.exports.controller = function(app, auth,  DAOs) {
  /* GET signin */
  app.get('/signin', function(req, res) {
    res.render('pages/userSignin', {title: 'Sign in'});
  });

  /* GET signup */
  app.get('/signup', function(req, res) {
    DAOs.sectionDAO.getAll({
      success : function(result) {
        res.status(200);
        res.render('pages/userSignup', {title: 'Sign up', section: result.rows});
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error');
      }
    });
  });
}
