const express = require("express");
const { registerUser, registerLawyer, login, logout } = require("../controllers/authController.js");


const authRouter = express.Router();

authRouter.post("/register/user", registerUser); 
authRouter.post("/register/lawyer", registerLawyer); 
authRouter.post("/login", login); 
authRouter.post("/logout", logout);

module.exports = {authRouter};

