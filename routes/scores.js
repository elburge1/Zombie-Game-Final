var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var scores = require('../models/scores')
var users = require('../models/users')

function zombieScores(){
  return knex('user_scores');
}

/* GET users listing. */
router.get('/:index', function(req, res, next) {
  if(res.locals.user){
    scores.getByFacebookId(user[0].user_id, req.params.index).then(function(scores){
      if (scores[0]){
        res.locals.pageData.scores = scores[0];
      }
      res.render('/index')
    });
  } else {
    res.render('/index')
  }
});

module.exports = router;
