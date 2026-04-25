const mongoose = require('mongoose');

const pomodoroSessionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['completed', 'interrupted', 'ongoing'],
      default: 'ongoing',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);
