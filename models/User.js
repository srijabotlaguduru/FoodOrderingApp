const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
});

module.exports = mongoose.model('User', UserSchema);



// //User.js

// const mongoose = require('mongoose');

// // Define User schema
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   location: {
//     latitude: { type: Number },
//     longitude: { type: Number },
//   },
//   customerId: { type: String, required: true, unique: true },
// });

// // Create User model
// const User = mongoose.model('User', userSchema);

// module.exports = User;
