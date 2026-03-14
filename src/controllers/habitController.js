const Habit = require('../models/Habit');

// @desc    Obtener todos los hábitos del usuario
// @route   GET /api/habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    // Verificar rachas para cada hábito
    habits.forEach(habit => {
      if (!habit.checkStreak()) {
        // Si se perdió la racha, reiniciar currentStreak
        habit.currentStreak = 0;
      }
    });
    
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

// @desc    Obtener un hábito por ID
// @route   GET /api/habits/:id
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
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

// @desc    Crear un nuevo hábito
// @route   POST /api/habits
exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      user: req.user.id
    });
    
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

// @desc    Actualizar un hábito
// @route   PUT /api/habits/:id
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
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

// @desc    Eliminar un hábito
// @route   DELETE /api/habits/:id
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
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

// @desc    Marcar hábito como completado
// @route   POST /api/habits/:id/complete
exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    // Marcar como completado (maneja reinicio de racha automáticamente)
    const completed = habit.complete();
    
    await habit.save();
    
    res.status(200).json({
      success: true,
      data: habit,
      message: completed ? 'Hábito completado' : 'Ya estaba completado hoy'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtener progreso de un hábito
// @route   GET /api/habits/:id/progress
exports.getHabitProgress = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!habit) {
      return res.status(404).json({
        success: false,
        error: 'Hábito no encontrado'
      });
    }
    
    const progress = {
      currentStreak: habit.currentStreak,
      bestStreak: habit.bestStreak,
      progressPercentage: Math.min((habit.currentStreak / 66) * 100, 100),
      completedToday: habit.wasCompletedToday(),
      totalCompletions: habit.completedDates.length,
      lastCompletedDate: habit.lastCompletedDate
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