var express = require('express');
var router = express.Router();
var pool = require('../db');

/* GET home page. */
router.get('/dogs', async function(req, res, next) {
    try{
        let dogs = await pool.query('SELECT name, size FROM Dogs INN')
    }
});

module.exports = router;
