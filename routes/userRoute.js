const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

//This file defines API endpoints for user authentication.

router.post("/register", registerUser);  // Register a user
router.post("/login", loginUser);        // Login a user
router.get("/current",validateToken, currentUser);     // Get current user info

module.exports = router;    