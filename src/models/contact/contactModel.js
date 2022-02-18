// Created By Yeison Gustavo Niño Murcia
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  person: {
    type: mongoose.Types.ObjectId,
    ref: 'Person',
    required: [true, 'Para crear contacto debe existir como persona.']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Para crear contacto debe asociarse el usuario.']
  },
  /** Seudonimo definido por el usuario para el proveedor o cliente */
  alias: {
    type: String,
    uppercase: true,
    trim: true
  },
  /** Rol del contacto PROVIDER - CLIENT */
  role: {
    type: String,
    uppercase: true,
    trim: true,
    enum: ["PROVIDER", "CLIENT"],
    // "Rol no admitido"]
    required: [true, 'Por favor ingrese el rol asociado, es un dato obligatorio.']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});
// userSchema.index({ phoneNumber: +1 });
const contact = mongoose.model('Contact', userSchema, 'Contact');
contact.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = contact;
