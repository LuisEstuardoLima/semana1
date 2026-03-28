const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const connectDB = require('./config/database');
const habitRoutes = require('./routes/habits');
const authRoutes = require('./routes/auth');

// Conectar a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API de Seguimiento de Hábitos funcionando',
    version: '1.0.0',
    status: 'online'
  });
});

// Ruta de health check para Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Solo iniciar servidor si no estamos en modo de exportación
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;