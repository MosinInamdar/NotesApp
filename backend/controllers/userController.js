// Single Responsibility Principle: This controller is responsible for user-related operations.
// Dependency Inversion Principle: The controller depends on abstractions (User model, bcrypt, jwt) rather than concrete implementations.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Single Responsibility Principle: Handles creating a new user account.
exports.createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Single Responsibility Principle: Validating required fields.
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  try {
    // Open/Closed Principle: Easily extendable logic for checking existing users.
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "The user already exists" });
    }

    // Single Responsibility Principle: Hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Dependency Inversion Principle: JWT generation is abstracted using environment variables.
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error("Error in create-account:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Handles user login.
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "Email not given" });
  }
  if (!password) {
    return res.status(400).json({ error: true, message: "Password not given" });
  }
  try {
    const userInfo = await User.findOne({ email });
    if (!userInfo) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    // Single Responsibility Principle: Validate password using bcrypt.
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid Credentials" });
    }

    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(200).json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Single Responsibility Principle: Retrieves the authenticated user's details.
exports.getUser = async (req, res) => {
  try {
    const { user } = req.user; // Assumes the authenticateToken middleware attaches the user object.
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
      return res.sendStatus(401);
    }
    return res.json({
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn,
      },
      message: "",
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};
