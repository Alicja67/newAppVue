const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
  author: { type: String, required: true },
  sender: { type: String, required: true },
  title: { type: Array, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Contacts', ContactsSchema );