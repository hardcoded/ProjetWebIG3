module.exports = function(db, url) {
  var module = {};
  // Create new user
  module.create = function(user, callback) {

  };
  // Retrieve users (all of them or one in particular)
  module.getAll = function(callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM account';
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
      var queryString = 'SELECT * FROM account WHERE id = $1';
      client.query(queryString, [id], function(err, result) {
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
    // Update a user
  module.update = function(user, callback) {

  };
  // Delete a user
  module.delete = function(id, callback) {

  }

  return module;
};
