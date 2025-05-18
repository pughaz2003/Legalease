const express = require("express");
const router = express.Router();
const { registerProBono } = require("../controllers/proBonoController");

router.post("/", registerProBono);

module.exports = router;
