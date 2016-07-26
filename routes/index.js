var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var scoresModel = require('../models/scores');
var usersModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = res.locals.user;
  Promise.all([scoresModel.getTopScores()])
  .then(scoredata => {
    var scores = scoredata[0];
    res.locals.pageData = {};
    res.locals.pageData.scores = [];
    for (var j = 0; j < scoredata[0].length; j++){
      res.locals.pageData.scores.push(scores[j].score)
    }
  })
  res.render('index');
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
})

module.exports = router;
