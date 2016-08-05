var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var scoresModel = require('../models/scores');
var usersModel = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = res.locals.user;
  Promise.all([scoresModel.getTopScores(), usersModel.getAllUsers(), scoresModel.getUserScores(user.user_id)])
  .then(scoredata => {
    var scores = scoredata[0];
    var players = scoredata[1];
    var playerScores = scoredata[2];
    res.locals.pageData = {};
    res.locals.pageData.scores = [];
    res.locals.pageData.userScores = [];
    playerScores.forEach( (playerScore) => {
      res.locals.pageData.userScores.push({
        playerScore: playerScore.score,
      })
    })
    scores.forEach ( (score) => {
      players.forEach((player) => {
        if (player.user_id === score.user_id){
          res.locals.pageData.scores.push({
            player: player,
            score: score.score,
          })
        }
      })
    })
    res.render('index');
  })
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
})

module.exports = router;
