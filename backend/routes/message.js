const express = require("express");
const router = express.Router();
const db = require("../config/db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { getCurrentUserId, getCurrentDateTime } = require("../utils/functions");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const toStorImagePath = imagePath
      ? `https://l0f7sf06-5000.euw.devtunnels.ms/${imagePath.split("\\").pop()}`
      : null;
    return res
      .status(200)
      .json({ message: "image uploaded", path: toStorImagePath });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});
module.exports = router;
