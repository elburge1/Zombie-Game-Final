var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var scoresModel = require('../models/scores');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = res.locals.user;
  Promise.all([scoresModel.getAllScores()])
  .then(data => {
    var scores = data;
    return data;
  })
  res.render('index');
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
})

module.exports = router;
