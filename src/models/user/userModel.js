// Created By Eyder Ascuntar Rosales
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  personId: {
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
