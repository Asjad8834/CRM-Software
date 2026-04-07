const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({

  contactId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },

  date:{
    type: Date,
    default: Date.now
  },

  notes:{
    type: String,
    required: true
  },

  outcome:{
    type: String,
    enum: ['Positive', 'Neutral', 'Negative'],
    default: 'Neutral'
  },

  followUpRequired:{
    type: Boolean,
    default: false
  }

}, {timestamps: true});

const interactionModel = mongoose.model("Interaction", interactionSchema);


module.exports = interactionModel;