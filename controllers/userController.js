const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const  bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//This file contains the logic for handling user registration, login, and retrieving user information.

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
    // Hash password using bycrypt library
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
    const { email, password } = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const user = await User.findOne({ email });
    //compare password with hased password
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
    },process.env.ACCESS_TOKEN);
    {expiresIn: '15m'};
        res.status(200).json({accessToken});
    }else{
        res.status(400);
        throw new Error("Invalid email or password !");
    }
    // Generates JWT token using jsonwebtoken.sign().
    // Returns JWT token to the user for future authentication.
    // The JWT contains username, email, id and is used for secure API access.
});

//@desc Current user info
//@route POST /users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{  
    res.json(req.user);
});



module.exports = {registerUser, loginUser,currentUser}; //Exports the registerUser function. This function will be used to handle the POST /users/register route.