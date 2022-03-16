// Created By Eyder Ascuntar Rosales
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    uppercase: true,
    trim: true
  },
  lastName: {
    type: String,
    uppercase: true,
    trim: true
  },
  documentNumber: {
    type: Number,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  externalId: {
    type: String,
    trim: true
  },
  companies: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Company'
    }
  ],
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
Person.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = Person;
