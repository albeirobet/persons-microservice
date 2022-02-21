// Created By Yeison Niño
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Por favor asocie el usuario, es un dato obligatorio. ']
  },
  contact: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact',
    required: [true, 'Por favor asocie el contacto, es un dato obligatorio. ']
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Por favor asocie el producto, es un dato obligatorio. ']
  },
  unit: {
    type: mongoose.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Por favor asocie la unidad de medida, es un dato obligatorio. ']
  },
  amount: {
    type: Number,
    required: [true, 'Por favor asocie la cantidad, es un dato obligatorio. ']
  },
  /** transactionType del contacto BUY - SELL */
  transactionType: {
    type: String,
    uppercase: true,
    trim: true,
    enum: ["BUY", "SELL"],
    required: [true, 'Por favor ingrese el tipo de transaccion, es un dato obligatorio.']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});
transactionSchema.index({ name: +1 });
const Transaction = mongoose.model('Transaction', transactionSchema, 'Transaction');
Transaction.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = Transaction;
