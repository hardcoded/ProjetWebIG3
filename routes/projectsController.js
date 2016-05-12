module.exports.controller = function(app, DAO) {
  /* GET projects page */
  app.get('/projects', function(req, res) {
    DAO.getAll({
      success : function(result) {
        res.status(200);
        res.render('pages/projects', {title: 'Projects', projects: result.rows});
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error');
      }
    });
  });

  /* GET projects page */
  app.get('/projects/:id', function(req, res) {
    DAO.getById(req.params.id, {
      success : function(result) {
        res.status(200);
        res.render('pages/projectDetails', {title: 'Project details', project: result});
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error', {title: 'Erreur', error: err});
      }
    });
  });

  /* POST project */
  app.post('/projects/add', function(req, res) {
    DAO.create(project, {
      success : function(result) {
        res.status(200);
        res.render('pages/projects', {title: 'Project details', projects: result.rows});
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error', {title: 'Erreur', error: err});
      }
    });
  });
}
