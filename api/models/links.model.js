const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  nasa_id: { type: String, required: true },
  href: { type: String, required: true },
});

module.exports = mongoose.model('Links', LinksSchema);