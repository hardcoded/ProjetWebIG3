module.exports.controller = function(app) {
  /* GET home page */
  app.get('/', function(req, res) {
    res.render('pages/index', {title: 'Infotech'});
  });
}
