const express = require('express');
const { 
  crearConductor, 
  obtenerConductoresDisponibles, 
  asignarConductor 
} = require('../controllers/conductorController');
const router = express.Router();

// Ruta para crear un nuevo conductor
router.post('/crear', crearConductor);

// Ruta para obtener todos los conductores disponibles
router.get('/disponibles', obtenerConductoresDisponibles);

// Ruta para asignar un conductor a una reserva
router.post('/asignar', asignarConductor);

module.exports = router;
