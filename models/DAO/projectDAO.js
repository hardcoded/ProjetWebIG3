var Project = require('../POJOs/project.js');

module.exports = function(db, url) {
  var module = {};

  // Create new project
  module.create = function(project, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      client.query(queryString, [project.name, project.description, project.maxHelpers, project.startDate, project.endDate, project.achievment, project.rank_required, project.owner], function(err, result) {
        done();
        if (err) {
          console.error(err);
          callback.fail(err);
        }
        else if (result.rowCount == 0) {
          callback.fail(null);
        }
        else {
          project.id = result.rows[0].id;
          callback.success(project);
        }
      });
    });
  };

  // Retrieve projects (all of them or one in particular)
  module.getAll = function(callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM project';
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
      var queryString = 'SELECT * FROM project WHERE id = $1';
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
          var project = new Project(result.rows[0].id, result.rows[0].name, result.rows[0].description,
            result.rows[0].max_helpers, result.rows[0].start_date, result.rows[0].end_date, result.rows[0].achievment,
            result.rows[0].rank_required, result.rows[0].owner)
          callback.success(project);
        }
      });
    });
  };

  // Update a project
  module.update = function(project, callback) {

  };

  // Delete a project
  module.delete = function(id, callback) {

  };

  return module;
};
