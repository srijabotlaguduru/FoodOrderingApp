//Restaurant.js

const mongoose = require('mongoose');

// Define Restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  uniqueId: { type: String, required: true, unique: true },
  mainTag: { type: String, required: true },
  tags: { type: [String], required: true},
});

// Create Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
