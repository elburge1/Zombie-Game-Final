var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var scoresModel = require('../models/scores')

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = res.locals.user;

  
});

module.exports = router;
