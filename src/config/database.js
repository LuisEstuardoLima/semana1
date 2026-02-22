const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    // En desarrollo, usar MongoDB en memoria
    if (process.env.NODE_ENV !== 'production') {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('✅ MongoDB en memoria conectado correctamente');
    } else {
      // En producción, usar MONGO_URI de .env
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB Atlas conectado correctamente');
    }
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;