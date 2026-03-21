const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/userController');

// Crear usuario (Alta)
router.post('/', crearUsuario);

// Obtener todos los usuarios
router.get('/', obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', obtenerUsuarioPorId);

// Actualizar usuario (Cambios)
router.put('/:id', actualizarUsuario);

// Eliminar usuario (Baja)
router.delete('/:id', eliminarUsuario);

module.exports = router;