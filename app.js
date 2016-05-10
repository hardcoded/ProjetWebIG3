var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var jwt = require('express-jwt');
var engine = require('ejs-locals');

app.set('port', (process.env.PORT));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Auth0 settings
var jwtCheck = jwt({
  secret: new Buffer('sFxiFSs3PPIX8HNnSyyYFOCZ9HZeL9PSC0X_b5AobiaOD3BT2JxVGNlUxdqbKaZy', 'base64'),
  audience: 'xqW3BC2q2q8nf6VlJlSjauumUNfaxG5X'
});
//locking access to authorized users only
app.use('/user', jwtCheck);
app.use('/forum', jwtCheck);

// Database url
var databaseURL = process.env.DATABASE_URL;

// Routing resources
var routes = require('./routes/router.js');

app.get('/', routes.home);
app.get('/db', routes.db);
//app.get('/user/:resource', routes.user);

app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
