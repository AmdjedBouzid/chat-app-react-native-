const jwt = require("jsonwebtoken");
const getCurrentUserId = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded____", decoded);
  if (decoded) {
    return decoded.id;
  }
  return res.status(400).json({ message: "invalid token" });
};

const getCurrentUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    return decoded;
  }
  return res.status(400).json({ message: "invalid token " });
};

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { getCurrentUserId, getCurrentUser, getCurrentDateTime };
//rahmenbou26@gmail.com
// rahmenbou26@gmail.com
// rahmenbou26@gmail.com
