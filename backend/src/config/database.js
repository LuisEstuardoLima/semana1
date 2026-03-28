const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Verificar que MONGODB_URI existe
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en variables de entorno');
    }

    console.log('🔗 Conectando a MongoDB Atlas...');
    
    // Opciones de conexión para evitar problemas
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Forzar IPv4
      retryWrites: true,
      w: 'majority'
    };
    
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('✅ Conectado a MongoDB Atlas correctamente');
    
    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en conexión MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB desconectado, intentando reconectar...');
    });
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;