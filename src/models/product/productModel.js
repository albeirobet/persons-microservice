// Created By Yeison Niño
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
productSchema.index({ phoneNumber: +1 });
const Product = mongoose.model('Product', productSchema, 'Product');
Product.ensureIndexes(function(err) {
  if (err) console.log(err);
});
module.exports = Product;
