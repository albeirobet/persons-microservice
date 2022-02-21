// Created By Yeison Niño
const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    trim: true,
    required: [true, 'Por favor ingrese el nombre, es un dato obligatorio. ']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});
unitSchema.index({ name: +1 });
const Unit = mongoose.model('Unit', unitSchema, 'Unit');
Unit.ensureIndexes(function(err) {
  if (err) console.log(err);
});
module.exports = Unit;
