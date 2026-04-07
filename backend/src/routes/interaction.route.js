const express = require("express");

const router = express.Router();


const{
  getInteractionsByContact,
  createInteraction,
  updateInteraction,
  deleteInteraction,
} = require("../controllers/interaction.controller");


//Routes
router.get("/:contactId", getInteractionsByContact);

router.post("/", createInteraction);

router.put("/:id", updateInteraction);

router.delete("/:id", deleteInteraction);


module.exports = router;
