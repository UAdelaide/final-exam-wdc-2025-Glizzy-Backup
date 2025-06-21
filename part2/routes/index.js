const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    console.log('asd');
    if (req.session.user) {
        console.log('f');
        const role = req.session.user.role;

        if (role == 'owner') {
            res.sendFile(path.join(__dirname, '../public/owner-dashboard.html'));

        } else if (role == 'walker') {
            res.sendFile(path.join(__dirname, '../public/walker-dashboard.html'));
        }
    }

    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
