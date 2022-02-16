// Created By Eyder Ascuntar Rosales
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  names: {
    type: String,
    uppercase: true,
    trim: true,
    required: [true, 'Por favor ingrese los nombres, es un dato obligatorio. ']
  },
  documentNumber: {
    type: Number,
    trim: true
  },
  phoneNumber: {
    type: String,
    uppercase: true,
    trim: true
  },

  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});
personSchema.index({ phoneNumber: +1 });
const Person = mongoose.model('Person', personSchema, 'Person');
Person.ensureIndexes(function(err) {
  if (err) console.log(err);
});
module.exports = Person;
