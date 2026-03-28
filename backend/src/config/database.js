const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Verificar que MONGODB_URI existe
    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI no está definida en variables de entorno');
      console.log('Por favor, configura MONGODB_URI en tu archivo .env');
      process.exit(1);
    }

    console.log('🔗 Conectando a MongoDB Atlas...');
    console.log('URL:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Oculta credenciales
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Conectado a MongoDB Atlas correctamente');
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.error('Verifica que:');
    console.error('1. La URL de MongoDB es correcta');
    console.error('2. El usuario y contraseña son correctos');
    console.error('3. Tu IP está permitida en MongoDB Atlas (Network Access)');
    process.exit(1);
  }
};

module.exports = connectDB;