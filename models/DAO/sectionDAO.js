function(db, connectString) {
  pg.connect(connectString, function(err, client, done) {
    client.query('SELECT * FROM section', function(err, result) {
      done();
      if (err) {
        console.error(err);
        res.send("Error" + err);
      }
      else {
        res.send(JSON.stringify({results: result.rows}));
      }
    });
  });
}
