const User = require('../models/User');

const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = { crearUsuario };