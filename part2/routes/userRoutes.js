const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

        res.status(201).json({ message: 'User registered', user_id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

router.get('/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    res.json(req.session.user);
});

// POST Login ------------------------------
router.post('/login', async (req, res) => {
    // Get email and password fields from form
    const { email, password } = req.body;

    try {
        // Select user info from database
        const [rows] = await db.query(`
      SELECT user_id, username, role FROM Users
      WHERE email = ? AND password_hash = ?
    `, [email, password]);

        // If no entries match a db record return a 401.
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the user is an owner or a walker, serve the appropriate page.
        // Also handles no role/invalid role.
        if (rows[0].role == "owner") {
            res.sendFile(path.join(__dirname, '../public/owner-dashboard.html'));
        } else if (rows[0].role == "walker") {
            res.sendFile(path.join(__dirname, '../public/walker-dashboard.html'));
        } else {
            return res.status(500).json({ error: 'User role is invalid.' });
        }

        // Stores user in a session.
        // Note that users with invalid roles will not get sessions stored.
        req.session.user = {
            id: rows[0].user_id,
            role: rows[0].role
        };

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.post('/logout', async (req, res) => {
    req.session.destroy(e => {
        if (e) {
            return res.status(500).send('Logout failed');
        }

        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

module.exports = router;