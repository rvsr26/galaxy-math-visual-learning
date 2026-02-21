const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// POST /api/scores/save — save a game score and update streak
router.post('/save', authMiddleware, async (req, res) => {
    try {
        const { game, score, difficulty } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Add score
        user.scores.push({ game, score, difficulty });

        // Update streak
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (user.lastPlayedDate === today) {
            // Already played today, streak unchanged
        } else if (user.lastPlayedDate === yesterday) {
            user.streak += 1;
        } else {
            user.streak = 1; // Reset streak
        }
        user.lastPlayedDate = today;

        await user.save();
        res.json({ message: 'Score saved!', streak: user.streak });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/scores/leaderboard?game=counting — top 10 scores for a game
router.get('/leaderboard', async (req, res) => {
    try {
        const { game } = req.query;
        const users = await User.find({}, 'username scores');

        let entries = [];
        users.forEach(user => {
            const gameScores = user.scores.filter(s => !game || s.game === game);
            if (gameScores.length > 0) {
                const best = Math.max(...gameScores.map(s => s.score));
                entries.push({ username: user.username, score: best, game: game || 'all' });
            }
        });

        entries.sort((a, b) => b.score - a.score);
        res.json(entries.slice(0, 10));
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/scores/me — current user's scores and streak
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId, 'username scores streak lastPlayedDate');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
