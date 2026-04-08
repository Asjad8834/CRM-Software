const express = require("express");
const cors = require("cors");
const app = express();

const contactRoutes = require("./routes/contact.route");
const interactionRoutes = require("./routes/interaction.route");
const dashboardRoutes = require("./routes/dashboard.route");

// Middleware
//to acces it from our render server we have to give it some parameters
//we do it after both frontend and backend has been deployed 
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://crm-software-plum.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

//Root route for showing on render
// Root route
app.get("/", (req, res) => {
  res.send("CRM Backend is running successfully 🚀");
});

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;