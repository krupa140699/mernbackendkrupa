const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  code: {
    type: String,
  },
  expireIn: {
    type: Number,
  },
});
module.exports = mongoose.model('otp', otpSchema , 'Otp')