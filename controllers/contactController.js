const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");


//This file defines the controller functions for handling requests related to contacts. It uses express-async-handler to handle asynchronous operations and errors.
//express-async-handler helps handle errors in asynchronous functions without using try...catch blocks manually.

//@desc Get all contacts 
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New contact 
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler(async (req, res) =>{
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fileds are mandatory !");
    }    
    const contact = await Contact.create({
        name,
        email,
        phone
    }) ;
    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access Public
const getContact =  asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    res.status(200).json(contact);
});

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateContact);
});

//@desc Delete contact 
//@route DELETE /api/contacts
//@access Public
const deleteContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found !");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
});



module.exports = { getContact, createContact , getContacts, updateContact, deleteContact};
