const mongoose = require('mongoose');

const TitlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model('Titles', TitlesSchema );
