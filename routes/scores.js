var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var scores = require('../models/scores')
var users = require('../models/users')

function zombieScores(){
  return knex('user_scores');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
