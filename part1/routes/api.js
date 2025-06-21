var express = require('express');
var router = express.Router();
var pool = require('../db');

/* GET home page. */
router.get('/dogs', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
