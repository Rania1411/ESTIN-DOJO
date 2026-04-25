const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pomodoro', pomodoroRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/chat', chatRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Estin Dojo API is running...');
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
