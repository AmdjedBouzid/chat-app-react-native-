const express = require("express");
const router = express.Router();
const db = require("../config/db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getCurrentUserId, getCurrentDateTime } = require("../utils/functions");
const multer = require("multer");
const path = require("path");
const verifyUser = require("../middleware/verifyUser");
/**
 * @method POST
 * @route {{domain}}/api/chats
 * @description create chat
 * @access public
 */
router.post("/", async (req, res) => {
  // This endpoint must be updated in the future for group chats
  try {
    const currentUserId = getCurrentUserId(req, res);
    const currentDate = getCurrentDateTime();
    const friendsId = req.body.friendId;

    const [rows] = await db.query(
      `SELECT 
              uc1.idChat
           FROM 
              user_chat uc1
           JOIN 
              user_chat uc2 ON uc1.idChat = uc2.idChat
           JOIN 
              chat ON uc1.idChat = chat.id
           WHERE 
              uc1.idUser = ? 
              AND uc2.idUser = ? 
              AND chat.state = 'bilateral'`,
      [currentUserId, friendsId]
    );

    if (rows.length > 0) {
      console.log(
        "The users have a common bilateral chat with id:",
        rows[0].idChat
      );
      return res.status(400).json({
        message: "A bilateral chat already exists between the users.",
      });
    }

    const [chat] = await db.query(
      "INSERT INTO chat (data_creation, number_members, state) VALUES (?, ?, ?)",
      [currentDate, 2, "bilateral"]
    );

    await db.query("INSERT INTO user_chat (idUser, idChat) VALUES (?, ?)", [
      currentUserId,
      chat.insertId,
    ]);
    await db.query("INSERT INTO user_chat (idUser, idChat) VALUES (?, ?)", [
      friendsId,
      chat.insertId,
    ]);

    console.log("New bilateral chat created with id:", chat.insertId);

    const [participants] = await db.query(
      `SELECT 
              u.id AS userId, 
              u.first_name, 
              u.last_name, 
              u.image
           FROM 
              user u
           WHERE 
              u.id = ?`,
      [friendsId] // Fetch details only for the friend
    );

    // Construct the response
    const response = {
      chatId: chat.insertId,
      creationDate: currentDate,
      state: "bilateral",
      number_members: 2,
      participants: participants, // This will now only contain the friend
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating chat:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @method GET
 * @route {{domain}}/api/chats
 * @description get all chats
 * @access public
 */
router.get("/", verifyUser, async (req, res) => {
  try {
    const currentUserId = getCurrentUserId(req, res);

    const [chats] = await db.query(
      `SELECT 
              chat.id AS chatId,
              chat.data_creation AS creationDate,
              chat.state,
              chat.number_members,
              message.id AS lastMessageId,
              message.msg AS lastMessage,
              message.sentAt AS lastMessageSentAt,
              message.idSender AS lastMessageSenderId
           FROM 
              chat
           JOIN 
              user_chat ON chat.id = user_chat.idChat
           LEFT JOIN 
              message ON chat.idLastMessage = message.id
           WHERE 
              user_chat.idUser = ?`,
      [currentUserId]
    );

    // If no chats are found
    if (chats.length === 0) {
      return res.status(404).json({ message: "No chats found for the user." });
    }

    // Fetch participants excluding the current user
    const detailedChats = await Promise.all(
      chats.map(async (chat) => {
        const [participants] = await db.query(
          `SELECT 
                  user.id AS userId,
                  user.first_name,
                  user.last_name,
                  user.image
               FROM 
                  user
               JOIN 
                  user_chat ON user.id = user_chat.idUser
               WHERE 
                  user_chat.idChat = ?
                  AND user.id != ?`, // Exclude the current user
          [chat.chatId, currentUserId]
        );

        return {
          ...chat,
          participants,
          lastMessage: chat.lastMessage
            ? {
                id: chat.lastMessageId,
                text: chat.lastMessage,
                sentAt: chat.lastMessageSentAt,
                senderId: chat.lastMessageSenderId,
              }
            : null,
        };
      })
    );

    return res.status(200).json(detailedChats);
  } catch (error) {
    console.error("Error fetching user chats:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Route: GET /api/chat-details
router.get("/:id", async (req, res) => {
  try {
    const idChat = req.params.id;
    const currentUserId = getCurrentUserId(req, res); // Replace with your logic to get the current user ID.

    if (!idChat) {
      return res.status(400).json({ error: "Chat ID is required." });
    }

    const [chats] = await db.query("SELECT * FROM chat WHERE id = ? ", [
      idChat,
    ]);
    if (chats.length === 0) {
      return res.status(400).json({ error: "Chat don't exit " });
    }
    const [user_chat] = await db.query(
      "SELECT * FROM user_chat WHERE idUser = ? AND idChat = ?",
      [currentUserId, idChat]
    );
    if (user_chat.length === 0) {
      return res
        .status(400)
        .json({ message: "you are not participant in this chat" });
    }

    const messagesQuery = `
        SELECT *
        FROM Message
        WHERE idChat = ?
        ORDER BY sentAt ASC
      `;
    const [messages] = await db.query(messagesQuery, [idChat]);

    // Query to get participants in the chat excluding the current user.
    const participantsQuery = `
        SELECT 
          user.id AS userId,
          user.first_name,
          user.last_name,
          user.image
        FROM 
          User AS user
        JOIN 
          User_Chat AS user_chat ON user.id = user_chat.idUser
        WHERE 
          user_chat.idChat = ?
          AND user.id != ?
      `;
    const [participants] = await db.query(participantsQuery, [
      idChat,
      currentUserId,
    ]);

    // Combine and return the data
    return res.json({
      chatId: idChat,
      participants, // Array of participants
      messages, // Array of messages
    });
  } catch (error) {
    console.error("Error fetching chat details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching chat details." });
  }
});

module.exports = router;
