var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Zombie Frontier' });
});

module.exports = router;
