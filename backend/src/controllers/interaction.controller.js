const mongoose = require("mongoose");
const interactionModel = require("../models/Interaction.model");
const contactModel = require("../models/Contact.model");

// GET all interactions for a contact
const getInteractionsByContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    // Validate contact ID
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = await contactModel.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    const interactions = await interactionModel
      .find({ contactId })
      .sort({ date: -1 });

    res.status(200).json({
      message: "Interactions fetched successfully",
      count: interactions.length,
      interactions: interactions
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching interactions",
      error: error.message
    });
  }
};

// POST create interaction
const createInteraction = async (req, res) => {
  try {
    const {
      contactId,
      outcome,
      date,
      notes,
      followUpRequired
    } = req.body;

    // Validate required fields
    if (!contactId || !outcome || !date || !notes) {
      return res.status(400).json({
        message: "contactId, outcome, date, and notes are required"
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    // Check if contact exists
    const contact = await contactModel.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    const newInteraction = new interactionModel({
      contactId,
      outcome,
      date,
      notes,
      followUpRequired
    });

    await newInteraction.save();

    // If follow-up required, update contact
    if (followUpRequired) {
      contact.needsFollowUp = true;
      await contact.save();
    }

    res.status(201).json({
      message: "Interaction created successfully",
      interaction: newInteraction
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating interaction",
      error: error.message
    });
  }
};

// PUT update interaction
const updateInteraction = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate interaction ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid interaction ID"
      });
    }

    const {
      outcome,
      date,
      notes,
      followUpRequired
    } = req.body;

    const updatedInteraction = await interactionModel.findByIdAndUpdate(
      id,
      {
        outcome,
        date,
        notes,
        followUpRequired
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedInteraction) {
      return res.status(404).json({
        message: "Interaction not found"
      });
    }

    // Optional: update contact follow-up status if needed
    if (typeof followUpRequired === "boolean") {
      const contact = await contactModel.findById(updatedInteraction.contactId);

      if (contact) {
        if (followUpRequired) {
          contact.needsFollowUp = true;
          await contact.save();
        }
      }
    }

    res.status(200).json({
      message: "Interaction updated successfully",
      interaction: updatedInteraction
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating interaction",
      error: error.message
    });
  }
};

// DELETE interaction
const deleteInteraction = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate interaction ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid interaction ID"
      });
    }

    const deletedInteraction = await interactionModel.findByIdAndDelete(id);

    if (!deletedInteraction) {
      return res.status(404).json({
        message: "Interaction not found"
      });
    }

    res.status(200).json({
      message: "Interaction deleted successfully",
      interaction: deletedInteraction
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting interaction",
      error: error.message
    });
  }
};

module.exports = {
  getInteractionsByContact,
  createInteraction,
  updateInteraction,
  deleteInteraction,
};