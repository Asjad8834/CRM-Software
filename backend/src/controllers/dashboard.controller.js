const mongoose = require("mongoose");
const contactModel = require("../models/Contact.model");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalContacts,
      hotLeads,
      warmLeads,
      coldLeads,
      followUpsDue,
      converted,
      notInterested
    ] = await Promise.all([  //promise.all(run all queries together) 
      contactModel.countDocuments(),
      contactModel.countDocuments({ interestLevel: 'Hot' }),
      contactModel.countDocuments({ interestLevel: 'Warm' }),
      contactModel.countDocuments({ interestLevel: 'Cold' }),
      contactModel.countDocuments({ needsFollowUp: true }),
      contactModel.countDocuments({ status: 'Converted' }),
      contactModel.countDocuments({ status: 'Not Interested' })
    ]);

    res.status(200).json({
      totalContacts,
      hotLeads,
      warmLeads,
      coldLeads,
      followUpsDue,
      converted,
      notInterested,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };