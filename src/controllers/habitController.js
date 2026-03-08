const Habit = require('../models/Habit');

// Obtener todos los hábitos
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: habits.length,
      data: habits
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener un hábito por ID
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Crear un nuevo hábito
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    
    res.status(201).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Actualizar un hábito
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Eliminar un hábito
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Hábito eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Marcar hábito como completado hoy
exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Verificar si ya fue completado hoy
    const alreadyCompleted = habit.completedDates.some(date => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });
    
    if (!alreadyCompleted) {
      habit.completedDates.push(today);
      
      // Calcular racha actual
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const completedYesterday = habit.completedDates.some(date => {
        const completedDate = new Date(date);
        completedDate.setHours(0, 0, 0, 0);
        return completedDate.getTime() === yesterday.getTime();
      });
      
      if (completedYesterday) {
        habit.currentStreak += 1;
      } else {
        habit.currentStreak = 1;
      }
      
      // Actualizar mejor racha
      if (habit.currentStreak > habit.bestStreak) {
        habit.bestStreak = habit.currentStreak;
      }
      
      await habit.save();
    }
    
    res.status(200).json({
      success: true,
      data: habit
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Obtener progreso de un hábito
exports.getHabitProgress = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    const progress = {
      currentStreak: habit.currentStreak,
      bestStreak: habit.bestStreak,
      progressPercentage: habit.getProgress(),
      completedToday: habit.wasCompletedToday(),
      totalCompletions: habit.completedDates.length
    };
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};