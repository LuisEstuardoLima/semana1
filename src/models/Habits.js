const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  streak: {
    type: Number,
    default: 0
  },
  lastCompletedDate: {
    type: Date
  },
  targetDays: {
    type: Number,
    default: 66
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);