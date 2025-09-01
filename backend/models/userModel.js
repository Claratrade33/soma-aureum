const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    plan: String,
    balance: Number,
    aportes: [Number]
});

const User = mongoose.model('User', userSchema);
module.exports = User;