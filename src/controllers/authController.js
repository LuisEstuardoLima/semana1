const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { user: { id: user.id, email: user.email } },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '7d' }
  );
};

// @desc    Registrar usuario
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: 'El usuario ya existe'
      });
    }

    // Crear usuario
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generar token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error en el servidor'
    });
  }
};

// @desc    Login usuario
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    // Generar token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error en el servidor'
    });
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Error en el servidor'
    });
  }
};