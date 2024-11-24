const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Inicialización de la app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('====================================');
    console.log('🟢 [INFO] Conectado a MongoDB correctamente');
    console.log(`   Conexión a: ${process.env.MONGO_URI}`);
    console.log('====================================');
  })
  .catch(err => {
    console.error('====================================');
    console.error('🔴 [ERROR] No se pudo conectar a MongoDB');
    console.error(`   Error: ${err.message}`);
    console.error('====================================');
  });

// Rutas
const authRoutes = require('./routes/auth');
const conductorRoutes = require('./routes/conductor');
const reservaRoutes = require('./routes/reserva');

// Usando las rutas con prefijos
app.use('/api/auth', authRoutes);
app.use('/api/conductores', conductorRoutes);
app.use('/api/reservas', reservaRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('====================================');
  console.log('🔵 [INFO] Servidor corriendo en:');
  console.log(`   http://localhost:${PORT}`);
  console.log('====================================');

  // Rutas disponibles
  console.log('💡 Rutas disponibles:');
  console.log('  ➡️ /api/auth        - Autenticación de usuarios');
  console.log('  ➡️ /api/conductores - Gestión de conductores');
  console.log('  ➡️ /api/reservas    - Gestión de reservas');
  console.log('====================================');
});
