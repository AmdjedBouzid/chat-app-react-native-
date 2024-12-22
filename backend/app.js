const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
// Routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const testRoute = require("./routes/test");
const notificationsRoute = require("./routes/notifications");

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
app.use("/", (req, res) => {
  return res.status(200).send("Welcome to my stylish page!");
});

// Create HTTP server with express app
const server = http.createServer(app);

// Set up Socket.io on the same server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
