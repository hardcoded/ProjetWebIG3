// Express for routing utilities
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
// for layout views
var engine = require('ejs-locals');
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var passwordHasher = require('password-hash');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');

app.set('port', (process.env.PORT));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
// Create a random secret key to create auth token
var randomSecretKey = uuid.v4();

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
var sectionDAO = require('./models/DAO/sectionDAO')(pg, url);
var participateDAO = require('./models/DAO/participateDAO')(pg, url);
// Routing resources
var authService = require('./routes/authService')(randomSecretKey, passwordHasher, jwt);
require('./routes/homeController').controller(app, authService);
require('./routes/projectsController').controller(app, authService, {
  'projectDAO' : projectDAO,
  'userDAO' : userDAO,
  'rankDAO' : rankDAO,
  'participateDAO': participateDAO
});
require('./routes/usersController').controller(app, authService, {
  'userDAO': userDAO,
  'projectDAO' : projectDAO,
  'rankDAO' : rankDAO,
  'participateDAO': participateDAO
});
require('./routes/authController').controller(app, authService, {
  'userDAO': userDAO,
  'sectionDAO': sectionDAO
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
      error: err
    });
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
