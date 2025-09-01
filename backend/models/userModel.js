const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, required: true },
  aporte: { type: Number, default: 0 },
  patrimonioVirtual: { type: Number, default: 0 },
  role: { type: String, default: 'user' } // 'admin' ou 'user'
});

module.exports = mongoose.model('User', userSchema);