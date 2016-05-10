/* GET home page */
module.exports.home = function(req, res){
  res.render('layout', {body: 'pages/index.ejs', title: 'Layout'});
};

/* GET database connection test */
module.exports.db = function(pg, connectString, req, res) {
  pg.connect(connectString, function(err, client, done) {
    console.log('Connection established !');
    client.query('SELECT * FROM rank', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.render('error', { title: 'Error' });
      }
      else {
        res.render('layout', { results: result.rows, body: 'pages/db.ejs', title: 'Data test' });
      }
    });
  });
};
