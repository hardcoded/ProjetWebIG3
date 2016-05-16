var Project = require('../POJOs/project.js');

module.exports = function(db, url) {
  var module = {};

  // Create new project
  module.create = function(project, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'INSERT INTO project(name, description, max_helpers, start_date, end_date, achievment, rank_required, owner) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
      client.query(queryString, [project.name, project.description, project.maxHelpers, project.start, project.end, project.achievment, project.rank, project.owner], function(err, result) {
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

  module.getByName = function(name, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM project WHERE name = $1';
      client.query(queryString, [name], function(err, result) {
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

  module.getByOwner = function(owner, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'SELECT * FROM project WHERE owner = $1';
      client.query(queryString, [owner], function(err, result) {
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

  // Update a project
  module.update = function(project, callback) {
    db.connect(url, function(err, client, done) {
      console.log('project dao');
      console.log(project);
      var queryString = 'UPDATE project SET description=$1, max_helpers=$2, start_date=$3, end_date=$4, achievment=$5, rank_required=$6  WHERE id=$7 RETURNING id';
      client.query(queryString, [project.description, project.maxHelpers, project.start, project.end, project.achievment, project.rank, project.id], function(err, result) {
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

  // Delete a project
  module.delete = function(id, callback) {
    db.connect(url, function(err, client, done) {
      var queryString = 'DELETE FROM project WHERE id = $1';
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
