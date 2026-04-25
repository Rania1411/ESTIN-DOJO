const pomodoroService = require('../services/pomodoroService');

// @desc    Start a new Pomodoro session
// @route   POST /api/pomodoro/start
// @access  Private
const startSession = async (req, res, next) => {
  try {
    const session = await pomodoroService.createSession(req.user.id, req.body.duration);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

// @desc    Complete a Pomodoro session
// @route   PUT /api/pomodoro/complete/:id
// @access  Private
const completeSession = async (req, res, next) => {
  try {
    const session = await pomodoroService.completeSession(req.params.id, req.user.id);
    res.status(200).json(session);
  } catch (error) {
    if (error.message === 'Session not found') res.status(404);
    if (error.message === 'Not authorized') res.status(401);
    if (error.message === 'Session already completed') res.status(400);
    next(error);
  }
};

// @desc    Get user's Pomodoro stats
// @route   GET /api/pomodoro/stats
// @access  Private
const getStats = async (req, res, next) => {
  try {
    const result = await pomodoroService.getUserStats(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startSession,
  completeSession,
  getStats,
};
