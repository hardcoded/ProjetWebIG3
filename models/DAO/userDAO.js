var User = require('../POJOs/user.js');

module.exports = function(db, url) {
  var module = {};

  // Create new user
  module.create = function(user, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'INSERT INTO account(first_name, last_name, mail, pseudo, password, admin, tokens, rank, section) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
      client.query(queryString, [user.firstName, user.lastName, user.mail, user.pseudo, user.password, user.admin, user.tokens, user.rank, user.section], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          user.id = result.rows[0].id;
          callback.success(user);
        }
      });
    });
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
          var user = new User(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].mail, result.rows[0].pseudo, result.rows[0].password, result.rows[0].admin, result.rows[0].tokens, result.rows[0].rank, result.rows[0].section);
          callback.success(user);
        }
      });
    });
  };

  module.getByName = function(pseudo, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM account WHERE pseudo = $1';
      client.query(queryString, [pseudo], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          var user = new User(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].mail, result.rows[0].pseudo, result.rows[0].password, result.rows[0].admin, result.rows[0].tokens, result.rows[0].rank, result.rows[0].section);
          callback.success(user);
        }
      });
    });
  };

    // Update a user
  module.update = function(user, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'UPDATE account SET first_name=$1, last_name=$2, mail=$3, pseudo=$4, admin=$5, section=$6 WHERE id=$7 RETURNING id';
      client.query(queryString, [user.firstName, user.lastName, user.mail, user.pseudo, user.admin, user.section, user.id], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          user.id = result.rows[0].id;
          callback.success(project);
        }
      });
    });
  };

  // Delete a user
  module.delete = function(id, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'DELETE FROM account WHERE id = $1';
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

  return module;
};
