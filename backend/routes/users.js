const express = require("express");
const router = express.Router();
const db = require("../config/db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getCurrentUserId } = require("../utils/functions");

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

router.get(
  "/requests",
  asyncHandler(async (req, res) => {
    try {
      const currentUserId = getCurrentUserId(req, res);

      // Query to get all requests where the current user is either the sender or receiver
      const [requests] = await db.query(
        "SELECT * FROM request WHERE idReceiver = ? AND state = 'waiting'",
        [currentUserId]
      );

      res.status(200).json({ requests });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })
);

/**
 * @route   POST /requests/accept/:idSender
 * @desc    Accept a request
 * @access  Private
 */
router.post(
  "/requests/accept/:idSender",
  asyncHandler(async (req, res) => {
    const { idSender } = req.params;
    const currentUserId = getCurrentUserId(req, res);

    const [request] = await db.query(
      "SELECT * FROM request WHERE idSender = ? AND idReceiver = ? AND state = 'waiting'",
      [idSender, currentUserId]
    );

    if (request.length === 0) {
      return res
        .status(404)
        .json({ message: "Request not found or already accepted/rejected." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.query(
      "UPDATE request SET state = 'accepted' WHERE idSender = ? AND idReceiver = ?",
      [idSender, currentUserId]
    );

    await db.query(
      "UPDATE request SET dateAcceptingRejecting = ? WHERE idSender = ? AND idReceiver = ?",
      [currentDate, idSender, currentUserId]
    );

    await db.query(
      "INSERT INTO friends (idUser1, idUser2, dateAcceptingRequest) VALUES (?, ?, ?)",
      [idSender, currentUserId, currentDate]
    );

    res.status(200).json({
      message: "Request accepted successfully",
      request: {
        idSender,
        idReceiver: currentUserId,
        state: "accepted",
      },
    });
  })
);

/**
 * @route   POST /requests/reject/:idSender
 * @desc    Reject a request
 * @access  Private
 */
router.post(
  "/requests/reject/:idSender",
  asyncHandler(async (req, res) => {
    const { idSender } = req.params;
    const currentUserId = getCurrentUserId(req, res);

    const [request] = await db.query(
      "SELECT * FROM request WHERE idSender = ? AND idReceiver = ? AND state = 'waiting'",
      [idSender, currentUserId]
    );

    if (request.length === 0) {
      return res
        .status(404)
        .json({ message: "Request not found or already accepted/rejected." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.query(
      "UPDATE request SET state = 'rejected' WHERE idSender = ? AND idReceiver = ?",
      [idSender, currentUserId]
    );

    await db.query(
      "UPDATE request SET dateAcceptingRejecting = ? WHERE idSender = ? AND idReceiver = ?",
      [currentDate, idSender, currentUserId]
    );

    res.status(200).json({
      message: "Request rejected successfully",
      request: {
        idSender,
        idReceiver: currentUserId,
        state: "rejected",
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
module.exports = router;
