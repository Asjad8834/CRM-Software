const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true
  },

  email:{
    type: String,
    trim: true,
    lowercase: true
  },

  phone:{
    type: String,
    trim: true
  },

  company:{
    type: String,
    trim: true
  },

  interestLevel:{
    type: String,
    enum: ['Hot', 'Warm', 'Cold']
  },

  status:{
    type: String,
    enum: ['New Lead', 'In Progress', 'Converted', 'Not Interested'],
    default: 'New Lead'
  },

  needsFollowUp:{
    type: Boolean,
    default: false
  },

  notes:{
    type: String,
    default: ''
  }
}, { timestamps: true });

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;