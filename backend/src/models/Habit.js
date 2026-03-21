const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  lastCompletedDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Método para verificar si fue completado hoy
habitSchema.methods.wasCompletedToday = function() {
  if (!this.lastCompletedDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastDate = new Date(this.lastCompletedDate);
  lastDate.setHours(0, 0, 0, 0);
  
  return lastDate.getTime() === today.getTime();
};

// Método para marcar como completado
habitSchema.methods.complete = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Verificar si ya fue completado hoy
  if (this.lastCompletedDate) {
    const lastDate = new Date(this.lastCompletedDate);
    lastDate.setHours(0, 0, 0, 0);
    
    // Si ya fue completado hoy, no hacer nada
    if (lastDate.getTime() === today.getTime()) {
      return false;
    }
    
    // Calcular diferencia de días
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Si pasó más de 1 día, reiniciar racha
    if (diffDays > 1) {
      this.currentStreak = 1;
    } else {
      // Incrementar racha
      this.currentStreak += 1;
    }
  } else {
    // Primera vez que se completa
    this.currentStreak = 1;
  }
  
  // Agregar fecha a completedDates
  this.completedDates.push(today);
  this.lastCompletedDate = today;
  
  // Actualizar mejor racha
  if (this.currentStreak > this.bestStreak) {
    this.bestStreak = this.currentStreak;
  }
  
  return true;
};

// Método para verificar si se perdió la racha
habitSchema.methods.checkStreak = function() {
  if (!this.lastCompletedDate) return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastDate = new Date(this.lastCompletedDate);
  lastDate.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1;
};

module.exports = mongoose.model('Habit', habitSchema);