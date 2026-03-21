const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { authMiddleware } = require('../middleware/auth');

// IMPORTANTE: authMiddleware debe ser una función, no un objeto
// Todas las rutas de hábitos requieren autenticación
router.use(authMiddleware);

// Rutas CRUD
router.get('/', habitController.getAllHabits);
router.get('/:id', habitController.getHabitById);
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

// Rutas específicas
router.post('/:id/complete', habitController.completeHabit);
router.get('/:id/progress', habitController.getHabitProgress);

module.exports = router;