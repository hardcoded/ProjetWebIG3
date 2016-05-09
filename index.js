var express = require('express');
var app = express();
var pg = require('pg');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/db', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM rank', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send("Error" + err);
      }
      else {
        res.render('pages/db', {results: result.rows} );
      }
    });
  });
});

app.post('/signup', function(req, res) {
  console.log(req.body.user.firstName);
  console.log(req.body.user.lastName);
  console.log(req.body.user.mail);
  console.log(req.body.user.phone);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
