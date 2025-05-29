const express = require("express");
const multer = require("multer");
const Case = require("../models/case.js");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/submit", upload.array("files"), async (req, res) => {
  try {
    const { userId, lawyerId, title, description, category } = req.body;
    const filePaths = req.files.map(file => file.path);

    const newCase = new Case({ userId, lawyerId, title, description, category, files: filePaths });
    await newCase.save();

    res.status(201).json({ success: true, message: "Case submitted successfully", case: newCase });
  } catch (err) {
    console.error("Error submitting case:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/lawyer/:lawyerId", async (req, res) => {
  try {
    const cases = await Case.find({ lawyerId: req.params.lawyerId }).populate("userId", "name email");
    res.json({ success: true, cases });
  } catch (err) {
    console.error("Error fetching cases for lawyer:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/lawyer/:lawyerId", async (req, res) => {
  try {
    const cases = await Case.find({ lawyerId: req.params.lawyerId }).populate("userId", "name email");
    res.json({ success: true, cases });
  } catch (err) {
    console.error("Error fetching cases for lawyer:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;