const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    // Verificar si no hay token
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Acceso denegado. No se proporcionó token de autenticación'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    // Buscar usuario en la base de datos
    const user = await User.findById(decoded.user.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido. Usuario no encontrado'
      });
    }
    
    // Adjuntar usuario al request
    req.user = user;
    req.userId = user._id;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expirado. Por favor, inicia sesión nuevamente'
      });
    }
    
    console.error('Error en middleware auth:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// Middleware de autorización (para roles, si es necesario)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Rol ${req.user.role} no autorizado para acceder a este recurso`
      });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize };