const mongoose = require('mongoose');

//This file defines the Mongoose schema and model for a Contact in a MongoDB database.

const contactSchema = mongoose.Schema({ 
   
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"], //Error Message: "Please add the email address"
        
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"],
    },
    
}, {timestamps: true}); //Enables automatic createdAt and updatedAt fields.

module.exports = mongoose.model('Contact', contactSchema);