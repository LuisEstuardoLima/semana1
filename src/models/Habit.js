const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del hábito es requerido'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  completedDates: [{
    type: Date
  }],
  currentStreak: {
    type: Number,
    default: 0
  },
  bestStreak: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Método para verificar si el hábito fue completado hoy
habitSchema.methods.wasCompletedToday = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return this.completedDates.some(date => {
    const completedDate = new Date(date);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  });
};

// Método para calcular el progreso hacia los 66 días
habitSchema.methods.getProgress = function() {
  const totalDays = 66;
  return Math.min((this.currentStreak / totalDays) * 100, 100);
};

module.exports = mongoose.model('Habit', habitSchema);