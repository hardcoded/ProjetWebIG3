// If the page can't be accessed without login
var requiresLogin = require('../requiresLogin');

module.exports.controller = function(app, DAOs) {
  /* GET projects page */
  app.get('/projects', function(req, res) {
    DAOs.projectDAO.getAll({
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
  app.get('/projects/new', requiresLogin, function(req, res) {
    DAOs.rankDAO.getAll({
      success : function(result) {
        console.log('Query result :\n' + result);
        res.status(200);
        res.render('pages/createProject', {title: 'New Project', ranks: result.rows});
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error');
      }
    });
  });

  /* GET projects page */
  app.get('/projects/:id', function(req, res) {
    DAOs.projectDAO.getById(req.params.id, {
      success : function(project) {
        DAOs.userDAO.getById(project.owner, {
          success : function(user) {
            DAOs.rankDAO.getById(project.rank, {
              success : function(rank) {
                res.status(200);
                res.render('pages/projectDetails', {title: 'Project details', project: project, user: user, rank: rank});
              },
              fail : function(err) {
                res.status(404);
                res.render('pages/error', {title: 'Erreur', error: err});
              }
            });
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        });
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error', {title: 'Erreur', error: err});
      }
    });
  });

  /* POST project */
  app.post('/projects/new', function(req, res) {
    //var project = new Project(req.body.projectName, req.body.projectDesc, req.body.maxHelpers, req.body.startDate, req.body.endDate, );
    DAOs.projectDAO.create(project, {
      success : function(result) {
        res.status(201);
        res.redirect('/projects');
      },
      fail : function(err) {
        res.status(404);
        res.render('pages/error', {title: 'Erreur', error: err});
      }
    });
  });
}
