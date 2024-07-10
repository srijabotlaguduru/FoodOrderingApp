// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
    const { name, email, password, location } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            location
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token,
                    user: {
                        name: user.name,
                        location: user.location
                    }
                 });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
      
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token,
                    user: {
                        name: user.name,
                        location: user.location
                    }
                 });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { v4: uuidv4 } = require('uuid'); // Import uuid

// // GET all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // POST a new user (signup)
// router.post('/', async (req, res) => {
//   const { name, email, password, location } = req.body;

//   try {
//     console.log(req);
//     console.log("called")
//     // Generate a unique customerId
//     const customerId = uuidv4(); // This generates a unique ID
//     console.log(customerId);
//     // Create a new user instance
//     const user = new User({
//       name,
//       email,
//       password,
//       location, // Ensure 'location' is correctly handled
//       customerId, // Assign generated customerId
//     });

//     console.log(user);
//     // Save the new user to the database
//     const newUser = await user.save();
//     console.log("hi");
//     // Send the newly created user back as response
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;
