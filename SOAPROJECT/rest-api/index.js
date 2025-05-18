const express = require('express');
const path = require('path');
const connectDB = require('../config/db');
const Event = require('../model/event');
const { publishEvent } = require('../service/kafkaProducerService');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve a simple HTML form to test the API (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../interface/index.html'));
});

// POST /event endpoint to receive events and publish to Kafka
app.post('/event', async (req, res) => {
  try {
    const { user_id, content_id, category, action } = req.body;

    // Validate required fields
    if (!user_id || !content_id || !category || !action) {
      return res.status(400).json({ error: 'Missing required fields: user_id, content_id, category, action' });
    }

    // Store event in MongoDB
    const dbEvent = new Event({ user_id, content_id, category, action });
    await dbEvent.save();

    // Publish event via Kafka producer service
    await publishEvent({ user_id, content_id, category, action });

    res.status(200).json({ success: true, message: 'Event stored and published successfully' });
  } catch (err) {
    console.error('Error publishing event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /events - get all events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /event/:id - delete an event by id
app.delete('/event/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`REST API listening on port ${PORT}`);
});
