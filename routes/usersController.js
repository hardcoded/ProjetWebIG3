
module.exports.controller = function(app, auth,  DAOs) {

  /* POST project */
  app.post('/user/projects/:id/delete', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.projectDAO.getById(req.params.id, {
          success: function(proj) {
            if(id == proj.rows[0].owner) {
              DAOs.projectDAO.delete(req.params.id, {
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

  /* GET user's */
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

  /* GET user's */
  app.get('/user/participate', function(req, res) {
    auth.authenticate(req, {
      success: function(id) {
        DAOs.participateDAO.getByHelper(id, {
          success : function(result) {
            console.log(result);
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
}
