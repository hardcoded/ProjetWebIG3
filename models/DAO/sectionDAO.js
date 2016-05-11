module.exports = function(db, url) {
  var module = {};

// Create new section
  module.create = function(project, callback) {

  };

  // Retrieve sections (all of them or one in particular)
  module.getAll = function(callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM section';
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
      var queryString = 'SELECT * FROM section WHERE id = $1';
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

  // Update section
  module.update = function(project, callback) {

  };

  // Delete section
  module.delete = function(id, callback) {

  }

  return module;
};
