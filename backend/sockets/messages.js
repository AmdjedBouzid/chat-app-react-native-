const db = require("../config/db");

const handlingMessages = async (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);
    });

    socket.on("waitMessage", async (data) => {
      const { idSender, idChat, message, image } = data;

      try {
        const sentAt = new Date();

        if (image) {
          const [result] = await db.query(
            "INSERT INTO message (idSender, idChat, image, msg, sentAt) VALUES (?, ?, ?, ?, ?)",
            [idSender, idChat, image, message, sentAt]
          );

          console.log("Image message insert result:", result);

          const insertedId = result.insertId;

          if (!insertedId) {
            throw new Error("Insert ID not returned from database");
          }

          const [updateResult] = await db.query(
            "UPDATE chat SET idLastMessage = ? WHERE id = ?",
            [insertedId, idChat]
          );
          console.log("Chat update result:", updateResult);

          io.to(idChat).emit("newMessage", {
            msg: message,
            image: image,
            id: insertedId,
            idSender,
            idChat,
            sentAt,
          });
        } else {
          const [result] = await db.query(
            "INSERT INTO message (idSender, idChat, msg, sentAt) VALUES (?, ?, ?, ?)",
            [idSender, idChat, message, sentAt]
          );

          console.log("Text message insert result:", result);

          const insertedId = result.insertId;

          if (!insertedId) {
            throw new Error("Insert ID not returned from database");
          }

          const [updateResult] = await db.query(
            "UPDATE chat SET idLastMessage = ? WHERE id = ?",
            [insertedId, idChat]
          );
          console.log("Chat update result:", updateResult);

          io.to(idChat).emit("newMessage", {
            msg: message,
            image: null,
            id: insertedId,
            idSender,
            idChat,
            sentAt,
          });
        }
      } catch (queryError) {
        console.error("Database query error:", queryError);
        socket.emit("error", {
          message: "Failed to save message in database",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

module.exports = handlingMessages;
