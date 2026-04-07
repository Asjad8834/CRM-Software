const express = require("express");
const cors = require("cors");
const app = express();

const contactRoutes = require("./routes/contact.route");
const interactionRoutes = require("./routes/interaction.route");
const dashboardRoutes = require("./routes/dashboard.route");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;