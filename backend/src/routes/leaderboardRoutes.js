const express = require('express');
const router = express.Router();
const {
  getGlobalLeaderboard,
  getYearlyLeaderboard,
} = require('../controllers/leaderboardController');

// Leaderboards are generally public, but can be protected if desired
router.get('/global', getGlobalLeaderboard);
router.get('/year/:year', getYearlyLeaderboard);

module.exports = router;
