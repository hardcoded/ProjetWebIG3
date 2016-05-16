// If the page can't be accessed without login
var Project = require('../models/POJOs/project.js');
// date formating utilities
var dateFormat = require('dateformat');

module.exports.controller = function(app, auth, DAOs) {
  /* GET projects page */
  app.get('/projects', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getAll({
          success : function(result) {
            res.status(200);
            res.render('pages/projects', { title: 'Projets', mess: "Projets soutenus par Infotech", projects: result.rows, authenticated: true, owner: id });
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
            res.render('pages/projects', {title: 'Projets', mess: "Projets soutenus par Infotech", projects: result.rows, authenticated: false, owner: null});
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

  /* GET project update */
  app.get('/projects/:id/update', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getById(req.params.id, {
          success: function(proj) {
            DAOs.rankDAO.getAll({
              success: function(rank) {
                if(id == proj.owner) {
                  proj.start = dateFormat(proj.start, "fullDate");
                  proj.end = dateFormat(proj.end, "fullDate");
                  res.status(200);
                  res.render('pages/updateProject', {title: 'Modifier projet', project: proj, ranks: rank.rows, authenticated:true})
                }
                else {
                  res.redirect('/user/projects');
                }
              },
              fail: function(err) {
                res.render('pages/error', {title: 'Erreur', error: err});
              }
            });
          },
          fail: function(err) {
            res.status(404);
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        })
      },
      fail: function() {
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
                    project.start = dateFormat(project.start, "fullDate");
                    project.end = dateFormat(project.end, "fullDate");
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
        DAOs.rankDAO.getByName(req.body.rank, {
          success: function(rank) {
            var project = new Project(-1, req.body.projectName, req.body.projectDesc, req.body.maxHelpers, dateFormat(req.body.startDate, "isoDate"), dateFormat(req.body.endDate, "isoDate"), 0, rank.id, id);
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
          fail: function(err) {
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        });
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });

  /* POST project particpation */
  app.get('/projects/:id/particpate', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        console.log(id);
        console.log(req.params.id);
        DAOs.particpateDAO.create(req.params.id, id, {
          success : function(project) {
            res.status(201);
            res.redirect('/');
          },
          fail : function (err) {
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        });
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });

  /* POST project */
  app.post('/projects/new', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.rankDAO.getByName(req.body.rank, {
          success: function(rank) {
            var project = new Project(-1, req.body.projectName, req.body.projectDesc, req.body.maxHelpers, dateFormat(req.body.startDate, "isoDate"), dateFormat(req.body.endDate, "isoDate"), 0, rank.id, id);
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
          fail: function(err) {
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        });
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });

  /* POST project */
  app.post('/projects/:id/update', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getById(req.params.id, {
          success: function(proj) {
            if(id == proj.owner) {
              DAOs.rankDAO.getByName(req.body.rank, {
                success: function(rank) {
                  var project = new Project(proj.id, req.body.projectName, req.body.projectDesc, req.body.maxHelpers, dateFormat(req.body.startDate, "isoDate"), dateFormat(req.body.endDate, "isoDate"), req.body.achievement, rank.id, id);
                  DAOs.projectDAO.update(project, {
                    success : function(result) {
                      res.status(201);
                      res.redirect('/user/projects');
                    },
                    fail : function(err) {
                      res.render('pages/error', {title: 'Erreur', error: err});
                    }
                  });
                },
                fail: function(err) {
                  res.render('pages/error', {title: 'Erreur', error: err});
                }
              })
            }
            else {
              res.redirect('/user/projects');
            }
          },
          fail: function(err) {
            res.status(404);
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        })
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });

  /* POST project */
  app.post('/projects/:id/delete', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getById(req.params.id, {
          success: function(proj) {
            if(id == proj.owner) {
              DAOs.projectDAO.delete(proj.id, {
                success : function(result) {
                  res.status(201);
                  res.redirect('/user/projects');
                },
                fail : function(err) {
                  res.render('pages/error', {title: 'Erreur', error: err});
                }
              });
            }
            else {
              res.redirect('/user/projects');
            }
          },
          fail: function(err) {
            res.status(404);
            res.render('pages/error', {title: 'Erreur', error: err});
          }
        })
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });
}
