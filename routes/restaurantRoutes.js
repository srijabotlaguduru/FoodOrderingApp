//restaurantRoutes.js

const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET restaurants by tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const tag = req.params.tag;
    const restaurants = await Restaurant.find({ tags: { $in: [tag] } });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    uniqueId: req.body.uniqueId,
    mainTag: req.body.mainTag,
    tags: req.body.tags,
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
