var express = require('express');
var router = express.Router();
const promisedPool = require('../db');

/* GET dogs. */
router.get('/dogs', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch dogs from db.
        const [dogs] = await pool.query('SELECT name, size, username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id;');
        res.json(dogs.map(dog => ({dog_name: dog.name, size: dog.size, owner_username: dog.username})));
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.', error: e.message });
    }
});

/* GET dogs. */
router.get('/walkrequests/open', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch walk requests from db.
        const [requests] = await pool.query('SELECT request_id, name, requested_time, duration_minutes, location, username FROM WalkRequests INNER JOIN (Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id) ON WalkRequests.dog_id = Dogs.dog_id WHERE status=\'open\';');
        res.json(requests.map(request => ({request_id: request.request_id, dog_name: request.name, requested_time: request.requested_time, duration_minutes: request.duration_minutes, location: request.location, owner_username: request.username})));
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch open walk requests.', error: e.message });
    }
});

/* GET dogs. */
router.get('/walkers/summary', async function (req, res, next) {
    try {
        const pool = await promisedPool;
        // Try to fetch dogs from db.
        const [walkers] = await pool.query('SELECT username, COUNT(rating_id), ROUND(AVG(rating), 1), COUNT(DISTINCT CASE WHEN status = \'completed\' THEN request_id END) AS completed_walks FROM Users LEFT JOIN WalkRatings r ON u.user_id = r.walker_id LEFT JOIN WalkRequests wr ON wr.request_id = r.request_id AND wr.status = \'completed\' WHERE u.role = \'walker\' GROUP BY u.user_id, u.username ORDER BY u.username;'
');
        res.json({ dogs });
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.', error: e.message });
    }
});

module.exports = router;
