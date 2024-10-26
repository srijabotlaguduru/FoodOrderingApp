//server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');


// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from your frontend's origin
}));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI_USERS, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('User Database connected'))
    .catch(err => console.log(err));

// MongoDB connection setup for restaurant database
const restaurantDB = mongoose.createConnection(process.env.MONGO_URI_RESTAURANTS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
restaurantDB.on('error', console.error.bind(console, 'MongoDB connection error for restaurant database:'));
restaurantDB.once('open', () => {
  console.log('Restaurant Database connected');
});

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
