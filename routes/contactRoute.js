// This contactRoute.js file defines Express routes for handling contact-related API requests. 

const express = require('express');
const router = express.Router();
const {getContact ,createContact ,getContacts,deleteContact,updateContact } = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

//Route for /api/contacts
router.route("/").get(getContacts).post(createContact);

//Route for /api/contacts/:id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

//GET /api/contacts/:id → Calls getContact to fetch a specific contact by ID.
//PUT /api/contacts/:id → Calls updateContact to update a specific contact by ID.
//DELETE /api/contacts/:id → Calls deleteContact to remove a contact by ID




module.exports = router;