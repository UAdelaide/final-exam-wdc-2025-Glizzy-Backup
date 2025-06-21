var express = require('express');
var router = express.Router();
var pool = require('../db');

/* GET home page. */
router.get('/dogs', async function(req, res, next) {
    try{
        let dogs = await pool.query('SELECT name, size FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id;');
        res.json({ dogs });
    } catch(e){
        res.status(500).json()
    }
});

module.exports = router;
