var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var scores = require('../models/scores')
var users = require('../models/users')

function zombieScores(){
  return knex('user_scores');
}

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.user){
    scores.addScore(req.user.user_id, req.body.score).then(function(){
      res.json({message: 'Success!'})
    })
  } else {
    res.sendStatus(401)
  }
});

module.exports = router;
