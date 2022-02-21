// Created By Yeison Niño
const mongoose = require('mongoose');

const unitMeasurementSchema = new mongoose.Schema({
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
unitMeasurementSchema.index({ name: +1 });
const UnitMeasurement = mongoose.model('UnitMeasurement', unitMeasurementSchema, 'UnitMeasurement');
UnitMeasurement.ensureIndexes(function(err) {
  if (err) console.log(err);
});
module.exports = UnitMeasurement;
