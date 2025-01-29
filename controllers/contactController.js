//@desc Get all contacts 
//@route GET /api/contacts
//@access Public
const getContacts = (req, res) =>{
    res.status(200).json({
        message: "Get all contacts"
    });
}
