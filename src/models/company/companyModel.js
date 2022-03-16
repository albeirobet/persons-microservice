// Created By Yeison Gustavo Niño Murcia
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    trim: true
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'Person'
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Person'
    }
  ],
  contacts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Contact'
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
// companySchema.index({ phoneNumber: +1 });
const company = mongoose.model('Company', companySchema, 'Company');
company.ensureIndexes(function (err) {
  if (err) console.log(err);
});
module.exports = company;
