
module.exports.controller = function(app, auth,  DAOs) {

  /* GET users list */
  app.get('/users', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.userDAO.getById(id, {
          success : function(user) {
            if (user.admin) {
              DAOs.userDAO.getAll({
                success : function(result) {
                  res.status(200);
                  res.render('pages/users', { title: 'Users', mess: "Liste des utilisateurs inscrits", users: result.rows, authenticated: true, isAdmin: user.admin});
                },
                fail : function(err) {
                  res.status(404);
                  res.render('pages/error');
                }
              });
            }
            else {
              res.redirect('/')
            }
          },
          fail : function(err) {
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

  /* GET user's projects */
  app.get('/user/projects', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getByOwner(id, {
          success : function(result) {
            res.status(200);
            res.render('pages/projects', { title: 'Projects', mess: "Projets dont vous êtes à l'initiative", projects: result.rows, authenticated: true, owner: id });
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error');
          }
        });
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });

  app.post('/users/:id/delete', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.userDAO.getById(req.params.id, {
          success: function(user) {
            DAOs.userDAO.delete(user.id, {
              success : function(result) {
                res.status(201);
                res.redirect('/users');
              },
              fail : function(err) {
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



  // GET user's participations
  /*
  app.get('/user/participate', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.participateDAO.getByHelper(id, {
          success : function(result) {
            DAOs.projectDAO.getById(result, {
              succes: function(res) {
                res.status(200);
                res.render('pages/projects', { title: 'Projects', mess: "Projets sur lesquels vous êtes inscrit", projects: res.rows, authenticated: true });
              },
              fail: function(err) {
                res.status(404);
                res.render('pages/error');
              }
            });
          },
          fail : function(err) {
            res.status(404);
            res.render('pages/error');
          }
        });
      },
      fail: function() {
        res.redirect('/signin');
      }
    });
  });
  */
}
