// handling routes
var express = require('express');
var router = express.Router();

// database utilities
var pg = require('pg');
var connectString = process.env.DATABASE_URL;

/* GET home page */
router.get('/', function(req, res){
  res.render('pages/index', {title: 'Infotech'});
});

router.get('/projects', function(req, res) {
  res.render('pages/projects', {title: 'Projects'});
});

/* GET database connection test */
router.get('/database', function(req, res) {
  pg.connect(connectString, function(err, client, done) {
    client.query('SELECT * FROM rank', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.render('error', { title: 'Error' });
      }
      else {
        res.render('pages/db', { results: result.rows, title: 'Data test' });
      }
    });
  });
});

module.exports =router;
