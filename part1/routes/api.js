var express = require('express');
var router = express.Router();
const promisedPool = require('../db');

/* GET dogs. */
router.get('/dogs', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch dogs from db.
        const [dogs] = await pool.query('SELECT name, size, username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id;');
        res.json(dogs.map(dog => ({dog_name: dogs.name, size: dogs.size, owner_username: dogs.username})) });
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.', error: e.message });
    }
});

/* GET dogs. */
router.get('/walkrequests/open', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch dogs from db.
        const [requests] = await pool.query('SELECT request_id, name, requested_time, duration_minutes, location, username FROM WalkRequests INNER JOIN (Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id) ON WalkRequests.dog_id = Dogs.dog_id WHERE status=\'open\';');
        res.json({ request_id: requests.request_id, dog_name: requests.dog_name, requested_time: requests.requested_time, duration_minutes: requests.duration_minutes, location: requests.loaction, owner_username: requests.username });
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch open walk requests.', error: e.message });
    }
});

/* GET dogs. */
router.get('/walkers/summary', async function (req, res, next) {
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
