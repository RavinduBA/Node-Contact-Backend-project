const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema); //Exports the User model. This model will be used to interact with the users collection in the database.