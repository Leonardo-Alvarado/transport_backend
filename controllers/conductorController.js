const Conductor = require('../models/Conductor');

// Crear conductor
exports.crearConductor = async (req, res) => {
  const { nombre, estado, ubicacion } = req.body;

  try {
    const conductor = new Conductor({
      nombre,
      estado,
      ubicacion
    });

    await conductor.save();
    res.status(201).json({ 
      message: 'Conductor creado con éxito',
      conductor: conductor // Devuelve los detalles del conductor creado
    });
  } catch (error) {
    console.error('Error al crear conductor:', error);  // Log para depurar errores
    res.status(500).json({ message: 'Error al crear conductor', error });
  }
};

// Obtener conductores disponibles
exports.obtenerConductoresDisponibles = async (req, res) => {
  try {
    const conductores = await Conductor.find({ estado: 'disponible' });

    if (conductores.length === 0) {
      return res.status(404).json({ message: 'No hay conductores disponibles' });
    }

    res.status(200).json({
      message: 'Conductores disponibles encontrados con éxito',
      conductores // Devuelve la lista de conductores disponibles
    });
  } catch (error) {
    console.error('Error al obtener conductores disponibles:', error);  // Log para depurar errores
    res.status(500).json({ message: 'Error al obtener conductores disponibles', error });
  }
};

// Asignar conductor a una reserva
exports.asignarConductor = async (req, res) => {
  const { reservaId, conductorId } = req.body;

  try {
    // Buscar el conductor
    const conductor = await Conductor.findById(conductorId);
    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado' });
    }

    // Verificar que el conductor esté disponible
    if (conductor.estado === 'ocupado') {
      return res.status(400).json({ message: 'El conductor está ocupado' });
    }

    // Cambiar el estado del conductor a ocupado
    conductor.estado = 'ocupado';
    await conductor.save();

    // Buscar la reserva y asignar el conductor
    const reserva = await Reserva.findById(reservaId);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Asignar conductor a la reserva y cambiar el estado de la reserva
    reserva.conductor = conductorId;
    reserva.estado = 'en proceso';
    await reserva.save();

    res.status(200).json({
      message: 'Conductor asignado correctamente a la reserva',
      conductor,
      reserva
    });
  } catch (error) {
    console.error('Error al asignar conductor:', error);
    res.status(500).json({ message: 'Error al asignar conductor', error });
  }
};
