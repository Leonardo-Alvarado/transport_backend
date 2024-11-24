const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de registro de usuario
router.post('/registro', authController.registrarUsuario);

// Ruta de login de usuario
router.post('/login', authController.loginUsuario);

module.exports = router;
