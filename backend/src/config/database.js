const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // En producción, MONGODB_URI es obligatoria
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI no está definida en variables de entorno');
      console.error('Por favor, configura MONGODB_URI en Render');
      process.exit(1);
    }

    console.log('🔗 Conectando a MongoDB Atlas...');
    console.log('URL:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    
    console.log('✅ Conectado a MongoDB Atlas correctamente');
    
    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error en conexión MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB desconectado');
    });
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.error('Verifica que:');
    console.error('1. La URL de MongoDB es correcta');
    console.error('2. El usuario y contraseña son correctos');
    console.error('3. Tu IP está permitida en MongoDB Atlas');
    process.exit(1);
  }
};

module.exports = connectDB;
