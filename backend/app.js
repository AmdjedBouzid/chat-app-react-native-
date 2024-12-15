const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
// Routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

const app = express();

// Use middleware
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());

// Define Routes

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

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
