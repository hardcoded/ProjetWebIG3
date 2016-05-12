var Rank = require('../POJOs/rank.js');

module.exports = function(db, url) {
  var module = {};

  // Create new rank
  module.create = function(rank, callback) {

  };

  // Retrieve ranks (all of them or one in particular)
  module.getAll = function(callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM rank';
      client.query(queryString, function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else {
          callback.success(result);
        }
      });
    });
  };

  module.getById = function(id, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM rank WHERE id = $1';
      client.query(queryString, [id], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          var rank = new Rank(result.rows[0].id, result.rows[0].name, result.rows[0].description, result.rows[0].tokens_equired);
          callback.success(rank);
        }
      });
    });
  };

  // Update a rank
  module.update = function(rank, callback) {

  };

  // Delete a rank
  module.delete = function(id, callback) {

  };

  return module;
};
