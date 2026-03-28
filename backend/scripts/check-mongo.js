const mongoose = require('mongoose');
require('dotenv').config();

async function checkConnection() {
  console.log('Verificando conexión a MongoDB Atlas...');
  console.log('URL (oculta):', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI no está definida');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Conexión exitosa!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkConnection();