const express = require("express");
const { registerUser, registerLawyer, login } = require("../controllers/authController.js");


const authRouter = express.Router();

authRouter.post("/register/user", registerUser); 
authRouter.post("/register/lawyer", registerLawyer); 
authRouter.post("/login", login); 

module.exports = {authRouter};

