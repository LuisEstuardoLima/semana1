const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener token del header
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token, autorización denegada'
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Token no válido'
    });
  }
};

module.exports = authMiddleware;