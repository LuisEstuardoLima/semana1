const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // En producción, solo usar MongoDB Atlas
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI no está definida en producción');
      }
      
      console.log('🔗 Conectando a MongoDB Atlas...');
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ Conectado a MongoDB Atlas');
      return;
    }
    
    // En desarrollo, usar MongoDB en memoria si no hay URI
    if (!process.env.MONGODB_URI) {
      console.log('🔧 Usando MongoDB en memoria para desarrollo...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('✅ MongoDB en memoria conectado');
      return;
    }
    
    // Desarrollo con MongoDB Atlas
    console.log('🔗 Conectando a MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ La aplicación no puede iniciar sin base de datos en producción');
      process.exit(1);
    } else {
      console.error('⚠️ Usando modo offline - algunas funciones pueden no estar disponibles');
    }
  }
};

module.exports = connectDB;