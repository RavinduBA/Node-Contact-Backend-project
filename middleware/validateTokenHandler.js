const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];  // Trim spaces

   // console.log("Received Token:", token);  // Debugging

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        console.error("JWT Error:", err.message);  // Log error
        res.status(401);
        throw new Error("User is not authorized! Invalid Token.");
      }

      req.user = decoded.user;
      next();
    });
    if(!token){
      res.status(401);
      throw new Error("User is not authorized! Token not found.");
    }
  }
});

module.exports = validateToken;
