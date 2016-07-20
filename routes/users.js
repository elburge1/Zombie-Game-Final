var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var users = require('../models/users')

function zombieUsers(){
  return knex('zombie_users');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
