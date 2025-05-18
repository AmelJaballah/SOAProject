// This file is only needed if you want to store events in MongoDB.
// For Kafka publishing, use a plain object instead of this model.

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  content_id: { type: String, required: true },
  category: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
