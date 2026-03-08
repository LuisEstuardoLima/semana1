const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// Rutas CRUD básicas
router.get('/', habitController.getAllHabits);
router.get('/:id', habitController.getHabitById);
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

// Rutas específicas para hábitos
router.post('/:id/complete', habitController.completeHabit);
router.get('/:id/progress', habitController.getHabitProgress);

module.exports = router;