const { getCurrentUserId } = require("../utils/functions");

const verifyUser = (req, res, next) => {
  try {
    const currentUserId = getCurrentUserId(req, res);
    console.log("verifyUser is called, current user is:", currentUserId);

    if (!currentUserId) {
      throw new Error("User not authenticated");
    }

    next();
  } catch (error) {
    console.error("Error getting user:", error.message);
    res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = verifyUser;
