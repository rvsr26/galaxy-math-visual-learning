const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
        if (password.length < 4) return res.status(400).json({ error: 'Password must be at least 4 characters' });

        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ error: 'Username already taken' });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, passwordHash });
        await user.save();

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, username: user.username, streak: user.streak });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return res.status(401).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, username: user.username, streak: user.streak });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// POST /api/auth/guest
router.post('/guest', async (req, res) => {
    try {
        const username = `Guest_${Date.now()}`;
        const password = Math.random().toString(36).slice(-8);
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            passwordHash,
            isGuest: true // Optional: track guest users if needed in schema later
            // Default values from schema will handle the rest
        });
        await user.save();

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Short expire for guests? 7d is fine too.
        res.status(201).json({ token, username: user.username, streak: user.streak });
    } catch (err) {
        console.error("Guest login error:", err);
        res.status(500).json({ error: 'Server error during guest login' });
    }
});

module.exports = router;
