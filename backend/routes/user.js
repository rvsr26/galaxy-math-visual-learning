const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// GET /api/user/profile - Get full profile including coins, avatar, unlocked planets
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-passwordHash');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/user/avatar - Update avatar customization
router.put('/avatar', authMiddleware, async (req, res) => {
    try {
        const { helmet, suit, pet } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (helmet) user.avatar.helmet = helmet;
        if (suit) user.avatar.suit = suit;
        if (pet) user.avatar.pet = pet;

        await user.save();
        res.json({ message: 'Avatar updated', avatar: user.avatar });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/user/unlock-planet - Unlock a new planet
router.post('/unlock-planet', authMiddleware, async (req, res) => {
    try {
        const { planet } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.unlockedPlanets.includes(planet)) {
            user.unlockedPlanets.push(planet);
            await user.save();
        }
        res.json({ message: 'Planet unlocked', unlockedPlanets: user.unlockedPlanets });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/user/add-coins - Add coins (called after game completion)
router.post('/add-coins', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.coins += amount;
        await user.save();
        res.json({ message: 'Coins added', coins: user.coins });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/user/settings - Update user preferences
router.put('/settings', authMiddleware, async (req, res) => {
    try {
        const { calmMode, celebrationStyle, animationSpeed } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (calmMode !== undefined) user.settings.calmMode = calmMode;
        if (celebrationStyle) user.settings.celebrationStyle = celebrationStyle;
        if (animationSpeed !== undefined) user.settings.animationSpeed = animationSpeed;

        await user.save();
        res.json({ message: 'Settings updated', settings: user.settings });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/user/award-badge - Manually award a badge
router.post('/award-badge', authMiddleware, async (req, res) => {
    try {
        const { badgeId } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.badges.includes(badgeId)) {
            user.badges.push(badgeId);
            await user.save();
        }
        res.json({ message: 'Badge awarded', badges: user.badges });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
