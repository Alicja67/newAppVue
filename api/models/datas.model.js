const mongoose = require('mongoose');

const DatasSchema = new mongoose.Schema({
  nasa_id: { type: String, required: false },
  title: { type: String, required: true },
  keywords: { type: Array, required: false },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Datas', DatasSchema);
