
const express = require("express");
const { saveUserLocation } = require("../controllers/userController.js");
const {adminAuth} = require("../middleware/auth.js"); 

const userRouter = express.Router();

userRouter.post("/save-location", adminAuth, saveUserLocation);

module.exports = userRouter;

