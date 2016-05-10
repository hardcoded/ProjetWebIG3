/* GET database connection test */
exports.index = function(req, res){
 pg.connect(connectString, function(err, client, done) {
   client.query('SELECT * FROM rank', function(err, result) {
     done();
     if (err) {
       console.error(err);
       res.send("Error" + err);
     }
     else {
       res.render('pages/db', {results: result.rows, title: 'Data test'} );
     }
   });
 });
};
