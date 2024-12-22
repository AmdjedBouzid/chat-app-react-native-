const express = require("express");
const router = express.Router();
const db = require("../config/db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getCurrentUserId } = require("../utils/functions");
const multer = require("multer");
const path = require("path");
/**
 * @route   POST /requests/accept/:idSender
 * @desc    Accept a request
 * @access  Private
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const currentUserId = getCurrentUserId(req, res);

      // Query to get all requests where the current user is either the sender or receiver
      const [requests] = await db.query(
        `SELECT 
          request.*, 
          user.id AS userId, 
          user.first_name, 
          user.last_name, 
          user.image 
        FROM 
          request 
        INNER JOIN 
          user 
        ON 
          request.idSender = user.id 
        WHERE 
          request.idReceiver = ? 
          AND request.state = ?`,
        [currentUserId, "waiting"]
      );

      res.status(200).json({ requests });
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: err.message });
    }
  })
);
/**
 * @route   POST /requests/reject/:idSender
 * @desc    Reject a request
 * @access  Private
 */
router.post(
  "/accept/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const currentUserId = getCurrentUserId(req, res);

    const [request] = await db.query(
      "SELECT * FROM request WHERE id = ? AND idReceiver = ? AND state = 'waiting'",
      [id, currentUserId]
    );

    if (request.length === 0) {
      return res
        .status(404)
        .json({ message: "Request not found or already accepted/rejected." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.query(
      "UPDATE request SET state = 'accepted', dateAcceptingRejecting = ? WHERE id = ?",
      [currentDate, id]
    );

    // Add to friends table
    await db.query(
      "INSERT INTO friends (idUser1, idUser2, dateAcceptingRequest) VALUES (?, ?, ?)",
      [request[0].idSender, currentUserId, currentDate]
    );

    res.status(200).json({
      message: "Request accepted successfully",
      request: {
        idSender: request[0].idSender,
        idReceiver: currentUserId,
        state: "accepted",
      },
    });
  })
);

router.post(
  "/reject/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the request ID from the route parameters
    const currentUserId = getCurrentUserId(req, res);

    // Fetch the request by its ID
    const [request] = await db.query(
      "SELECT * FROM request WHERE id = ? AND idReceiver = ? AND state = 'waiting'",
      [id, currentUserId]
    );

    if (request.length === 0) {
      return res
        .status(404)
        .json({ message: "Request not found or already accepted/rejected." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Update the state of the request to 'rejected'
    await db.query(
      "UPDATE request SET state = 'rejected', dateAcceptingRejecting = ? WHERE id = ?",
      [currentDate, id]
    );

    res.status(200).json({
      message: "Request rejected successfully",
      request: {
        idSender: request[0].idSender,
        idReceiver: currentUserId,
        state: "rejected",
      },
    });
  })
);

module.exports = router;
