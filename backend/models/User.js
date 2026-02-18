const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    game: { type: String, required: true },
    score: { type: Number, required: true },
    difficulty: { type: String, default: 'easy' },
    playedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    passwordHash: { type: String, required: true },
    scores: [scoreSchema],
    streak: { type: Number, default: 0 },
    lastPlayedDate: { type: String, default: null }, // YYYY-MM-DD
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
