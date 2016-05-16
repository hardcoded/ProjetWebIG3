// If the page can't be accessed without login
var Project = require('../models/POJOs/project.js');

module.exports.controller = function(app, auth, DAOs) {
  /* GET projects page */
  app.get('/projects', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getAll({
          success : function(result) {
            res.status(200);
            res.render('pages/projects', {title: 'Projects', projects: result.rows, authenticated: true});
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error');
          }
        });
      },
      fail: function() {
        DAOs.projectDAO.getAll({
          success : function(result) {
            res.status(200);
            res.render('pages/projects', {title: 'Projects', projects: result.rows, authenticated: false});
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error');
          }
        });
      }
    });
  });

  /* GET projects page */
  app.get('/projects/new', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.rankDAO.getAll({
          success : function(result) {
            res.status(200);
            res.render('pages/createProject', {title: 'New Project', ranks: result.rows, authenticated: true});
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error');
          }
        });
      },
      fail: function() {
        res.status(200);
        res.redirect('/signin');
      }
    });
  });

  /* GET projects page */
  app.get('/projects/:id', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getById(req.params.id, {
          success : function(project) {
            DAOs.userDAO.getById(project.owner, {
              success : function(user) {
                DAOs.rankDAO.getById(project.rank, {
                  success : function(rank) {
                    res.status(200);
                    res.render('pages/projectDetails', {title: 'Project details', project: project, user: user, rank: rank, authenticated: true});
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
      },
      fail: function() {
        DAOs.projectDAO.getById(req.params.id, {
          success : function(project) {
            DAOs.userDAO.getById(project.owner, {
              success : function(user) {
                DAOs.rankDAO.getById(project.rank, {
                  success : function(rank) {
                    res.status(200);
                    res.render('pages/projectDetails', {title: 'Project details', project: project, user: user, rank: rank, authenticated: false});
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
      }
    });
  });

  /* POST project */
  app.post('/projects/new', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        var project = new Project(-1,req.body.projectName, req.body.projectDesc, req.body.maxHelpers,req.body.startDate, req.body.endDate, 0, req.body.rank, id);
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
      },
      fail: function() {
        res.redirect('/projects/new');
      }
    });
  });
}
