require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const  cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();




const connectDB = require("./config/database.js");
connectDB();

const {authRouter} = require("./routes/auth.js");
const router =require("./routes/lawyerRoute.js");
const userRouter = require('./routes/userLocation.js');
const profileRouter =require('./routes/profile.js');
const proBonoRoutes = require("./routes/proBono.js");
const messageRoutes = require("./routes/message.js");










app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', 
    credentials: true}));

app.use("/",authRouter);
app.use("/api/lawyer",router);
app.use('/api/user', userRouter);
app.use('/api/profile',profileRouter);
app.use('/api/probono',proBonoRoutes);
app.use('/api/messages',messageRoutes)












const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
