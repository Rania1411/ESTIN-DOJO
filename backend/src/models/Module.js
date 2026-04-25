const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a module name'],
    },
    year: {
      type: String,
      required: [true, 'Please specify the academic year'],
      enum: ['1CP', '2CP', '1CS', '2CS', '3CS'],
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Module', moduleSchema);
