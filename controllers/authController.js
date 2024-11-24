const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el nuevo usuario
    const usuario = new Usuario({ nombre, email, password });

    // Log para mostrar la contraseña antes de guardar el usuario
    console.log('Contraseña antes de guardar (encriptación):', usuario.password);

    await usuario.save();  // Guardar el usuario en la base de datos

    // Log para verificar la contraseña encriptada después de guardar
    console.log('Contraseña encriptada después de guardar:', usuario.password);

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);  // Para depurar errores
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Log para mostrar la contraseña encriptada almacenada en la base de datos
    console.log('Contraseña encriptada almacenada en la base de datos:', usuario.password);

    // Comparar las contraseñas usando el método comparePassword
    const resultado = await usuario.comparePassword(password);
    console.log('Resultado de la comparación de contraseñas:', resultado);  // true si coincide, false si no

    if (!resultado) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si las contraseñas coinciden, generar un JWT
    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error al hacer login:', error);  // Log para ver detalles del error
    res.status(500).json({ message: 'Error al hacer login', error: error.message });
  }
};
