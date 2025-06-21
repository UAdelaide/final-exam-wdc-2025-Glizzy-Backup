var express = require('express');
var router = express.Router();
var pool = require('../db');

/* GET dogs. */
router.get('/dogs', async function (req, res, next) {
    try {
        // Try to fetch dogs from db.
        const [dogs] = await pool.query('SELECT name, size FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id;');
        res.json({ dogs });
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.' });
    }
});

module.exports = router;
