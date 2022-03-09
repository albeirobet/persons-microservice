// Created By Yeison Niño
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Types.ObjectId,
    ref: 'Transaction'
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  unit: {
    type: mongoose.Types.ObjectId,
    ref: 'Unit',
  },
  amount: {
    type: Number,
  },
  priceUnit: {
    type: Number
  },
  priceTotal: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date
  }
});
itemSchema.index({ transaction: +1 });
const Item = mongoose.model('Item', itemSchema, 'Item');
Item.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = Item;
