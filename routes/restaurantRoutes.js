const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Restaurant = require('../models/Restaurant');

// POST request to find restaurants by tag
router.post('/:tag', async (req, res) => {
  console.log("Backend called with tag:", req.params.tag);
  const { tag } = req.params;

  try {
    // Log the regex pattern used
    const regex = new RegExp(tag, 'i');
    console.log("Regex pattern:", regex);

    // Query the database
    const restaurant = await Restaurant.findOne({
      tags: { $in: [regex] }
    });

    // Log the result
    console.log("Restaurant found:", restaurant);

    if (!restaurant) {
      console.log("No restaurant found with that tag");
      return res.status(404).json({ msg: 'No restaurant found with that tag' });
    }

    // Prepare response payload
    const payload = {
      restaurant: {
        name: restaurant.name,
        mainTag: restaurant.mainTag,
        tags: restaurant.tags,
        uniqueId: restaurant.uniqueId
      }
    };

    // Sign JWT token with payload
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, restaurant: payload.restaurant });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// POST request to create a new restaurant
router.post('/', async (req, res) => {
  const { name, address, uniqueId, mainTag, tags } = req.body;

  try {
    const newRestaurant = new Restaurant({
      name,
      address,
      uniqueId,
      mainTag,
      tags
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
