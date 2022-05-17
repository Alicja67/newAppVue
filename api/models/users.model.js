const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Users', UsersSchema );
