const jwt = require("jsonwebtoken");
const getCurrentUserId = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  //console.log(token);

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log("decoded____", decoded);
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

module.exports = { getCurrentUserId, getCurrentUser };
