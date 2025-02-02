const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const  bcrypt = require('bcrypt');

//@desc Register a user
//@route POST /users/register
//@access Public
const registerUser = asyncHandler(async (req, res) =>{  
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered !");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("The hashed password is: ", hashedPassword) 
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    }); 
    console.log("The user is: ", user);
    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data !");
    }
    res.json({ message: "Register the user" });
});

//@desc Login a user
//@route POST /users/login
//@access Public
const loginUser = asyncHandler(async (req, res) =>{  
    res.json({ message: "Login user" });
});

//@desc Current user info
//@route POST /users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{  
    res.json({ message: "Current user information" });
});



module.exports = {registerUser, loginUser,currentUser}; //Exports the registerUser function. This function will be used to handle the POST /users/register route.