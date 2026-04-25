const leaderboardService = require('../services/leaderboardService');

// @desc    Get global leaderboard
// @route   GET /api/leaderboard/global
// @access  Public
const getGlobalLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await leaderboardService.fetchGlobalLeaderboard();
    res.status(200).json(topUsers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get yearly leaderboard
// @route   GET /api/leaderboard/year/:year
// @access  Public
const getYearlyLeaderboard = async (req, res, next) => {
  try {
    const topUsers = await leaderboardService.fetchYearlyLeaderboard(req.params.year);
    res.status(200).json(topUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGlobalLeaderboard,
  getYearlyLeaderboard,
};
