const express = require('express');
const router = express.Router();
const Habit = require('../models/Habits');


// Crear hábito (Alta)
router.post('/', async (req, res) => {
  try {
    const habit = new Habit(req.body);
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Obtener todos
router.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});


// Actualizar hábito (Cambios)
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Eliminar hábito (Baja)
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;