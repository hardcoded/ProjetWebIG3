
module.exports = function(db, url) {
  var module = {};

  // Create new project
  module.create = function(projectID, helperID, callback) {
    console.log('Project :\n');
    console.log(projectID);
    console.log('User :\n');
    console.log(helperID);
    db.connect(url, function(err, client, done) {
      var queryString = 'INSERT INTO participate(id_project, id_helper) VALUES ($1, $2)';
      client.query(queryString, [projectID, helperID], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          ;
          callback.success();
        }
      });
    });
  };

  // Retrieve projects (all of them or one in particular)
  module.getAll = function(callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM particpate';
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

  module.getByHelper = function(helper, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM participate WHERE id_helper = $1';
      client.query(queryString, [helper], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          callback.success(result);
        }
      });
    });
  };

  return module;
};
