// Interface Segregation Principle: This file provides a tailored interface for user-related operations.
// Single Responsibility Principle: This module is solely responsible for defining user routes.

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { authenticateToken } = require("../utilities");

// Single Responsibility Principle: Route for a welcome message.
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Notes App" });
});

// Single Responsibility Principle: Route for creating an account.
router.post("/create-account", userController.createAccount);

// Single Responsibility Principle: Route for user login.
router.post("/login", userController.login);

// Single Responsibility Principle: Route for retrieving the authenticated user’s details.
router.get("/get-user", authenticateToken, userController.getUser);

module.exports = router;
