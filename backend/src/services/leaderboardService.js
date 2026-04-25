const User = require('../models/User');

const fetchGlobalLeaderboard = async () => {
  return await User.find({})
    .sort({ 'pomodoroStats.totalMinutes': -1 })
    .limit(100)
    .select('name year pomodoroStats');
};

const fetchYearlyLeaderboard = async (year) => {
  return await User.find({ year })
    .sort({ 'pomodoroStats.totalMinutes': -1 })
    .limit(100)
    .select('name year pomodoroStats');
};

module.exports = {
  fetchGlobalLeaderboard,
  fetchYearlyLeaderboard,
};
