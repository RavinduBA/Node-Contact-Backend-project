//@desc Get all contacts 
//@route GET /api/contacts
//@access Public
const getContacts = (req, res) =>{
    res.status(200).json({
        message: "Get all contacts"
    });
}

//@desc Create New contact 
//@route POST /api/contacts
//@access Public
const createContact = (req, res) =>{
    console.log("The request body is: ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fileds are mandatory !");
    }    
    res.status(201).json({
        message: "Create contact"
    });
}

//@desc Get contact
//@route GET /api/contacts/:id
//@access Public
const getContact = (req, res) =>{
    res.status(200).json({
        message: `Get contact for  ${req.params.id}`
    });
}

//@desc Update contact 
//@route PUT /api/contacts/:id
//@access Public
const updateContact = (req, res) =>{
    res.status(200).json({
        message: `Update contact ${req.params.id}`
    });
}

//@desc Delete contact 
//@route DELETE /api/contacts
//@access Public
const deleteContact = (req, res) =>{
    res.status(200).json({
        message: `Delete contact ${req.params.id}`
    });
}



module.exports = { getContact, createContact , getContacts, updateContact, deleteContact};
