const mongoose = require('mongoose');

const TrainLocationSchema = new mongoose.Schema({
  trainId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TrainLocation', TrainLocationSchema);
