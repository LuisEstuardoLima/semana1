const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Verificar que MONGODB_URI existe en producción
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI no está definida en producción');
      process.exit(1);
    }

    // Si hay MONGODB_URI definida (producción o desarrollo con Atlas)
    if (process.env.MONGODB_URI) {
      console.log('🔗 Conectando a MongoDB Atlas...');
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ Conectado a MongoDB Atlas correctamente');
      return;
    }

    // Solo en desarrollo local, si no hay MONGODB_URI, usar mock
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️ Modo desarrollo sin MongoDB Atlas - usando datos mock');
      console.log('ℹ️ Las operaciones de base de datos no persistirán');
      return;
    }

    // Si llegamos aquí en producción, es un error
    console.error('❌ Error: No se puede conectar a la base de datos en producción');
    process.exit(1);

  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ La aplicación no puede iniciar sin base de datos en producción');
      process.exit(1);
    } else {
      console.warn('⚠️ Continuando sin base de datos (modo desarrollo)');
    }
  }
};

module.exports = connectDB;