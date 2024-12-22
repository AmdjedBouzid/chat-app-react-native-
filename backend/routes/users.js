const express = require("express");
const router = express.Router();
const db = require("../config/db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getCurrentUserId } = require("../utils/functions");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images")); // Directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });
/**
 * @route   POST /addfriend/:id
 * @desc    Add a friend (create a friendship between the current user and another user)
 * @access  Private (requires JWT token verification)
 */
router.post(
  "/addfriend/:id",
  asyncHandler(async (req, res) => {
    const secondUserId = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];
    // console.log("token________", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const currentUserId = getCurrentUserId(req, res);

    if (currentUserId === secondUserId) {
      return res
        .status(400)
        .json({ message: "Users cannot be friends with themselves." });
    }

    // Check if the friendship already exists
    const [existingFriendship] = await db.query(
      "SELECT * FROM friends WHERE (iduser1 = ? AND iduser2 = ?) OR (iduser1 = ? AND iduser2 = ?)",
      [currentUserId, secondUserId, secondUserId, currentUserId]
    );

    if (existingFriendship.length > 0) {
      return res
        .status(400)
        .json({ message: "This friendship already exists." });
    }

    const [existRequest] = await db.query(
      "SELECT * FROM request WHERE ((idSender = ? AND idReceiver = ?) OR (idSender = ? AND idReceiver = ?)) AND state = 'waiting'",
      [currentUserId, secondUserId, secondUserId, currentUserId]
    );

    if (existRequest.length > 0) {
      return res.status(400).json({ message: "This request already exists." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Format as YYYY-MM-DD HH:MM:SS
    const result = await db.query(
      "INSERT INTO request (idSender, idReceiver, state, dateSending) VALUES (?, ?, ?, ?)",
      [currentUserId, secondUserId, "waiting", currentDate]
    );

    res.status(201).json({
      message: "request added successfully.",
      friendship: {
        iduser1: currentUserId,
        iduser2: secondUserId,
      },
    });
  })
);

/**
 * @route   GET /me
 * @desc    Reject a request
 * @access  Private
 */
router.get(
  "/me",
  asyncHandler(async (req, res) => {
    console.log(req.headers.authorization);
    const ID = getCurrentUserId(req, res);

    const [users] = await db.query(`SELECT * FROM user WHERE id = ${ID}`);
    if (users.length === 0) {
      return res.json({ message: "user not found" }).status(404);
    }
    const { id, image, first_name, last_name, bio, email, birth_date } =
      users[0];

    return res
      .json({
        user: { id, image, first_name, last_name, bio, email, birth_date },
        message: "user found",
      })
      .status(200);
  })
);

router.post("/me", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    const id = getCurrentUserId(req, res); // Assume this retrieves the user ID correctly
    if (!id) return res.status(401).json({ message: "Unauthorized" });
    const { first_name, last_name, email, birth_date, bio } = req.body;
    console.log(req.body);
    const imagePath = req.file ? req.file.path : null;
    console.log(imagePath);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // const domainName = `${req.protocol}://${req.get("host")}`;
    const toStorImagePath = `https://l0f7sf06-5000.euw.devtunnels.ms/${imagePath
      .split("\\")
      .pop()}`;

    // console.log("toStorImagePath++++", toStorImagePath);

    const query = `
      UPDATE user
      SET first_name = ?, last_name = ?, email = ?, birth_date = ?, bio = ?, image = ?
      WHERE id = ?
    `;

    await db.query(query, [
      first_name,
      last_name,
      email,
      birth_date,
      bio,
      toStorImagePath,
      id,
    ]);

    res.status(200).json({
      message: "User profile updated successfully!",
      user: {
        id,
        first_name,
        last_name,
        email,
        birth_date,
        bio,
        image: toStorImagePath,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user profile." });
  }
});
module.exports = router;
