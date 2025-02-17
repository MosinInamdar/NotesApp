// Dependency Inversion Principle: This file depends on abstractions (routes) rather than concrete implementations.
// Single Responsibility Principle: This file is responsible solely for initializing the server and setting up middleware.

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Importing route modules (abstracted implementations)
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Single Responsibility Principle: Responsible for connecting to the database.
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Single Responsibility Principle: Delegate user-related endpoints to userRoutes.
app.use("/", userRoutes);

// Single Responsibility Principle: Delegate note-related endpoints to noteRoutes with a common prefix.
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
