const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Esquema del Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Encriptar la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Solo encripta si la contraseña ha sido modificada
  console.log('Contraseña antes de encriptar:', this.password);  // Log para verificar la contraseña antes de encriptarla
  this.password = await bcrypt.hash(this.password, 10);  // Encriptar la contraseña
  console.log('Contraseña encriptada:', this.password);  // Log para verificar la contraseña encriptada
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
