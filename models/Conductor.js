const mongoose = require('mongoose');

// Esquema de conductor
const conductorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { 
    type: String, 
    enum: ['disponible', 'ocupado'], 
    default: 'disponible' 
  },
  ubicacion: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }  // [longitud, latitud]
  }
});

// Crear índice geoespacial para realizar consultas por ubicación
conductorSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Conductor', conductorSchema);
