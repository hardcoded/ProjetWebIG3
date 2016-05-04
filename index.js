var express = require('express');
var app = express();
var pg = require('pg');
var logger = require('morgan');
var cookieparser = require('cookie-parser');
var cookiesession = require('cookie-session');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(logger('logs'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  response
  res.render('pages/index');
});

app.get('/times', function(req, res) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  res.send(result);
});

app.get('/db', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
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
