module.exports.controller = function(app, DAO) {
  /* GET projects page */
  app.get('/projects', function(req, res) {
    DAO.getAll({
      success : function(result) {
        res.render('pages/projects', {title: 'Projects', projects: result.rows});
      },
      fail : function(err) {
        res.render('pages/error');
      }
    });
  });

  /* GET projects page */
  app.get('/projects/:id', function(req, res) {
    DAO.getById(req.params.id, {
      success : function(result) {
        res.render('pages/projectDetails', {title: 'Project details', projects: result.rows});
      },
      fail : function(err) {
        res.render('pages/error');
      }
    });
  });
}
