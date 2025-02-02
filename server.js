const express = require("express");
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler"); //  Imports a custom error-handling middleware from ./middleware/errorHandler.js.
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
//This means any request to /api/contacts will be handled by the router inside ./routes/contactRoute.js.

app.use(errorHandler);
//Uses a custom error-handling middleware, which will handle any errors thrown in the application.
 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

