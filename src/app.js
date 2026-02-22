require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Conectar base de datos
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API de Control de Hábitos funcionando');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});