const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fecha: { type: Date, required: true },
  conductor: { type: mongoose.Schema.Types.ObjectId, ref: 'Conductor' },
  estado: { type: String, enum: ['pendiente', 'en proceso', 'finalizado'], default: 'pendiente' }
});

module.exports = mongoose.model('Reserva', reservaSchema);
