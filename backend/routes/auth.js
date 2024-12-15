const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userSchema = require("../utils/validation");

const SECRET_KEY = process.env.JWT_SECRET; // Replace with a secure key or load from .env

/**
 * @route   POST /users/register
 * @desc    Create a new user
 * @access  Public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Check if user with the provided email already exists
    const [existingUser] = await db.query(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exists.` });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const result = await db.query(
      "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword]
    );

    // Generate JWT
    const token = jwt.sign(
      { id: result[0].insertId, first_name, last_name, email },
      SECRET_KEY,
      { expiresIn: "20d" }
    );

    // Send response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: result[0].insertId,
        first_name,
        last_name,
        email,
      },
      token,
    });
  })
);

/**
 * @route   POST /users/login
 * @desc    Login a user and return a JWT token
 * @access  Public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find the user in the database
    const [user] = await db.query("SELECT * FROM User WHERE email = ?", [
      email,
    ]);

    // Check if user exists
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log(user);

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
      },
      SECRET_KEY,
      { expiresIn: "20d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user[0].id,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        email: user[0].email,
      },
      token,
    });
  })
);

module.exports = router;
