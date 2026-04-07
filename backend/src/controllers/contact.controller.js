
const contactModel = require("../models/Contact.model");

//Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Contacts fetched successfully",
      count: contacts.length,
      contacts: contacts
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message
    });
  }
};

//Get single contact
const getContactById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await contactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json({
      message: "Contact fetched successfully",
      contact: contact
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching contact",
      error: error.message
    });
  }
};

//Create Contact
const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      interestLevel,
      status,
      needsFollowUp,
      notes
    } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        message: "Either email or phone is required"
      });
    }

    if (email) {
      const existingContact = await contactModel.findOne({ email });

      if (existingContact) {
        return res.status(409).json({
          message: "Contact with this email already exists"
        });
      }
    }

    const newContact = new contactModel({
      name,
      email,
      phone,
      company,
      interestLevel,
      status,
      needsFollowUp,
      notes
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact: newContact
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating contact",
      error: error.message
    });
  }
};


//Update Contact
const updateContact = async (req, res)=>{
  try{
    const id = req.params.id;

    //check valid MongoDB object ID
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"Inavlid Contact ID"});
    }

    const{
      name, email, phone, company, interestLevel, status, needsFollowUp, notes
    } = req.body;

    //optional; check duplicate email if updating email
    if(email){
      const existingContact = await contactModel.findOne({
        email: email,
        _id: {$ne: id}
      });

      if(existingContact){
        res.status(400).json({
          message:"Another contact with this email already exists"
        })
      }
    }

    const updatedContact = await contactModel.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      company,
      interestLevel,
      status,
      needsFollowUp,
      notes
    },{
      new: true,
      runValidators: true
    });

    if(!updatedContact){
      return res.status(400).json({
        message:"Contact not found"
      })
    }

    res.status(200).json({
      message:"COntact updated Succesfully",
      contact: updatedContact
    })
  }
  catch(errro){
    res.status(500).json({
      message:"Errro updatimg contact",
      error: error.message
    })
  }
}


//Delete COntact
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const deletedContact = await contactModel.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact",
      error: error.message
    });
  }
};

module.exports={
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};