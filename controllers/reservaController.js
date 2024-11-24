const Reserva = require('../models/Reserva');
const Conductor = require('../models/Conductor');

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
  const { cliente, origen, destino, fecha } = req.body;
  try {
    const nuevaReserva = new Reserva({ cliente, origen, destino, fecha });
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};

// Obtener reservas por estado
exports.obtenerReservasPorEstado = async (req, res) => {
  const { estado } = req.params;
  try {
    const reservas = await Reserva.find({ estado });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas', error });
  }
};
