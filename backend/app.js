const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const handlingMessages = require("./sockets/messages");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const testRoute = require("./routes/test");
const notificationsRoute = require("./routes/notifications");
const chatsRoute = require("./routes/chats");
const messagesRoute = require("./routes/message");

const app = express();

// Use middleware
app.use(morgan("dev"));
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "images")));

// Define Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/test", testRoute);
app.use("/api/notifications", notificationsRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);
app.use("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to my stylish page!");
});

module.exports = app;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
handlingMessages(io);

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
