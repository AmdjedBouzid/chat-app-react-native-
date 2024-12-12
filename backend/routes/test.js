const express = require("express");
const router = express.Router();
const Chat = require("../classes/Chat");
const User = require("../classes/User");

/**
 * @method POST
 * @route http://localhost:5000/api/test
 * @description  teste
 * @access private
 */
router.get("/", (req, res) => {
  const user1 = new User();
  user1.email = "hello";
  console.log(user1.email);
  res.json({ message: "Welcome to the Messages API", user: user1.toString() });
});

module.exports = router;
