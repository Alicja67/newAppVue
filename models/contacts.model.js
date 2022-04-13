const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
  author: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Contacts', ContactsSchema );