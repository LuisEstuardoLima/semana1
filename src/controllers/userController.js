const User = require('../models/User');

// Crear usuario (Alta)
const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar usuario (Cambios)
const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar usuario (Baja)
const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};