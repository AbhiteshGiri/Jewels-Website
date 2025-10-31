const mongoose = require('mongoose');

const TempOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  type: { type: String, enum: ['signup', 'login', 'admin_login'], required: true },
  payload: { type: mongoose.Schema.Types.Mixed },
  expiresAt: { type: Date, required: true, index: true },
});

TempOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('TempOtp', TempOtpSchema);
