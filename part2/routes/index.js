const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
    if (req.session.user) {
        const role = req.session.user.role;

        if (role === 'owner') {            res.sendFile(path.join(__dirname, '../public/owner-dashboard.html'));
        
            res.redirect('/owner-dashboard');            res.sendFile(path.join(__dirname, '../public/owner-dashboard.html'));

        } else if (role === 'walker') {
            return res.redirect('/walker-dashboard');
        }
    }

    res.sendFile(path.join(__dirname, 'public/login.html'));
});

module.exports = router;