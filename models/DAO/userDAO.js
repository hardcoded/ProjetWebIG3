var User = require('../POJOs/user.js');

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
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          var user = new User(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].mail, result.rows[0].pseudo, result.rows[0].signup_date, result.rows[0].admin, result.rows[0].tokens, result.rows[0].rank, result.rows[0].section);
          callback.success(user);
        }
      });
    });
  };

    // Update a user
  module.update = function(user, callback) {

  };

  // Delete a user
  module.delete = function(id, callback) {

  };

  return module;
};
