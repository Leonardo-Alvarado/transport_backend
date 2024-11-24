const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.crearReserva);
router.get('/:estado', reservaController.obtenerReservasPorEstado);

module.exports = router;
