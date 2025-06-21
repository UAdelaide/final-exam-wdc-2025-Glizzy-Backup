var express = require('express');
var router = express.Router();
const promisedPool = require('../db');

/* GET dogs. */
router.get('/dogs', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch dogs from db.
        const [dogs] = await pool.query('SELECT name, size FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id;');
        res.json({ dogs });
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.', error: e.message });
    }
});

module.exports = router;
