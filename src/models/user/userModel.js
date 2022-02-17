// Created By Yeison Gustavo Niño Murcia
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  person: {
    type: mongoose.Types.ObjectId,
    ref: 'Person'
  },

  // multimediaResourceList: [
  //   {
  //     type: mongoose.Types.ObjectId,
  //     ref: 'MultimediaResource'
  //   }
  // ],

  status: {
    type: String,
    uppercase: true,
    trim: true
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
const user = mongoose.model('User', userSchema, 'User');
user.ensureIndexes(function(err) {
  if (err) console.log(err);
});
module.exports = user;
