const PomodoroSession = require('../models/PomodoroSession');
const User = require('../models/User');

const createSession = async (userId, duration) => {
  return await PomodoroSession.create({
    user: userId,
    duration: duration || 25,
    startTime: Date.now(),
    status: 'ongoing',
  });
};

const completeSession = async (sessionId, userId) => {
  const session = await PomodoroSession.findById(sessionId);

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.user.toString() !== userId) {
    throw new Error('Not authorized');
  }

  if (session.status === 'completed') {
    throw new Error('Session already completed');
  }

  session.status = 'completed';
  session.endTime = Date.now();
  await session.save();

  // Update user stats
  const user = await User.findById(userId);
  user.pomodoroStats.totalSessions += 1;
  user.pomodoroStats.totalMinutes += session.duration;
  await user.save();

  return session;
};

const getUserStats = async (userId) => {
  const user = await User.findById(userId);
  const recentSessions = await PomodoroSession.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(10);

  return {
    stats: user.pomodoroStats,
    recentSessions,
  };
};

module.exports = {
  createSession,
  completeSession,
  getUserStats,
};
