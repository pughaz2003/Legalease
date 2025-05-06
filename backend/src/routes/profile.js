const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileController.js");


router.get("/", getProfile);

module.exports = router;
