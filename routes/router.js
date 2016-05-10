/* GET home page */
module.exports.index = function(req, res){
  res.render('layout', { body: 'index.ejs', title: 'Infotech' });
};

/* GET database connection test */
module.exports.db = function(pg, connectString, req, res) {
  pg.connect(connectString, function(err, client, done) {
    client.query('SELECT * FROM rank', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.render('error', { title: 'Error' });
      }
      else {
        res.render('layout', { results: result.rows, body: '../views/pages/db.ejs', title: 'Data test' });
      }
    });
  });
};
