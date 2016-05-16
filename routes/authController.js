var User = require("../models/POJOs/user.js");

module.exports.controller = function(app, auth, DAOs) {

  /* POST sign up */
  app.post('/signup', function(req, res) {
    console.log("Sign up");
    DAOs.sectionDAO.getByName(req.body.userSection, {
      success: function(section) {
        DAOs.userDAO.getByName(req.body.userPseudo, {
          success : function(user) {
            res.redirect('/signup');
          },
          fail : function() {
            var user = new User(-1, req.body.userFirstName, req.body.userLastName, req.body.userMail, req.body.userPseudo, auth.hashPassword(req.body.userPwd), false, 0, 9, section.rows[0].id);
            DAOs.userDAO.create(user, {
              success : function(savedUser) {
                var token = auth.createToken(user.id);
                res.cookie('Infotech', token, { maxAge: 900000, httpOnly: true });
                res.redirect('/');
              },
              fail : function(errors) {
                if (errors == null) {
                  res.status(500);
                  res.render('pages/error', {title: 'Erreur', error: errors});
                }
                else {
                }
              }
            });
          }
        });
      },
      fail: function(error) {

      }
    });
  });

  /* POST sign in */
  app.post('/signin', function(req, res) {
    console.log("Sign in");
    DAOs.userDAO.getByName(req.body.userPseudo, {
      success : function(user) {
        if (auth.checkPassword(req.body.userPwd, user.password)) {
          var token = auth.createToken(user.id);
          res.cookie('Infotech', token, { maxAge: 900000, httpOnly: true });
          res.redirect('/');
        } else {
          res.redirect('/signin');
        }
      },
      fail : function() {
        res.redirect('/signin');
      }
    });
  });

  app.post('/signout', function(req, res) {
    res.clearCookie('Infotech');
    res.redirect('/');
  });

  app.post('/authenticate', function(req, res) {
    auth.authenticate(req, {
      success : function(userId) {
        res.statusCode = 200;
        res.render('pages/index', {title: 'Infotech', authenticated: true});
      },
      fail : function(message) {

      }
    });
  });
};
