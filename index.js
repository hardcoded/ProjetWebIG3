var express = require('express');
var app = express();
var pg = require('pg');
var logger = require('morgan');
var cookieparser = require('cookie-parser');
var cookiesession = require('cookie-session');

app.set('port', (process.env.PORT));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/db', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM compte', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send("Error" + err);
      }
      else {
        res.render('pages/db', {results: results.rows} );
      }
    });
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
