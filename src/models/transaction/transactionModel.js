// Created By Yeison Niño
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Por favor asocie el usuario, es un dato obligatorio. ']
  },
  contact: {
    type: mongoose.Types.ObjectId,
    ref: 'Contact',
    required: [true, 'Por favor asocie el contacto, es un dato obligatorio. ']
  },
  items: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
    }
  ],
  totalOrder: {
    type: Number
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
transactionSchema.index({ company: +1 });
const Transaction = mongoose.model('Transaction', transactionSchema, 'Transaction');
Transaction.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = Transaction;
