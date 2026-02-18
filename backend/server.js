const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scores', require('./routes/scores'));

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected successfully!' });
});

// Root Route
app.get('/', (req, res) => {
    res.send('Galaxy Math Backend is running');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
