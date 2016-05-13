// Express for routing utilities
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
// for layout views
var engine = require('ejs-locals');
var passport = require('passport');
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');
// This will configure Passport to use Auth0
var strategy = require('./setupPassport');

app.set('port', (process.env.PORT));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'sFxiFSs3PPIX8HNnSyyYFOCZ9HZeL9PSC0X_b5AobiaOD3BT2JxVGNlUxdqbKaZy', resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// get static files such as CSS
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Database utilities
var pg = require('pg');
var url = process.env.DATABASE_URL;
// DAOs
var projectDAO = require('./models/DAO/projectDAO')(pg, url);
var userDAO = require('./models/DAO/userDAO')(pg, url);
var rankDAO = require('./models/DAO/rankDAO')(pg, url);
// Routing resources
require('./routes/homeController').controller(app);
require('./routes/projectsController').controller(app, {
  'projectDAO' : projectDAO,
  'userDAO' : userDAO,
  'rankDAO' : rankDAO
});
require('./routes/usersController').controller(app, {});

// Auth0 callback handler
app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/' }),
  function(req, res) {
    if (!req.user) {
      console.log("login error");
      throw new Error('user null');
    }
    console.log("App :\n" + app);
    console.log("Passport : \n" + app.passport);
  res.redirect("/user");
});

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
});

// error handling
app.use(function(err, req, res, next) {
  console.log('Erreur : \n' + err);
  if(err.status == 404) {
    res.render('pages/404', {
      title: 'Erreur', error: err
    });
  }
  else {
    res.render('pages/error', {
      title: 'Erreur',
      message: err.message,
      status: err.status,
      error: err
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
