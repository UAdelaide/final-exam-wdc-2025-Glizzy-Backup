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
        const [walkers] = await pool.query('SELECT Users.username, COUNT(WalkRatings.rating_id) AS total_ratings, ROUND(AVG(WalkRatings.rating), 1) AS average_rating, COUNT(DISTINCT CASE WHEN WalkRequests.status = \'completed\' THEN WalkRequests.request_id END) AS completed_walks FROM Users INNER JOIN WalkRatings ON Users.user_id = WalkRatings.walker_id INNER JOIN WalkRequests ON WalkRatings.request_id = WalkRequests.request_id AND WalkRequests.status = \'completed\' WHERE Users.role = \'walker\' GROUP BY Users.user_id, Users.username;');
        res.json(walkers.map(walker => ({}))});
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch dogs.', error: e.message });
    }
});

module.exports = router;
