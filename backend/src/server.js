require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const  cookieParser = require("cookie-parser");
const cors = require("cors");
const chat = require("./models/chat.js");
const http = require('http');
const socketIo = require('socket.io');

const app = express();




const connectDB = require("./config/database.js");
connectDB();

const {authRouter} = require("./routes/auth.js");
const router =require("./routes/lawyerRoute.js");
const userRouter = require('./routes/userLocation.js');
const profileRouter =require('./routes/profile.js');
const proBonoRoutes = require("./routes/proBono.js");







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
app.use('/api/probono',proBonoRoutes)


const server = http.createServer(app); 

// 2. Attach Socket.io to the server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL in production
    methods: ["GET", "POST"]
  }
});

// 3. Socket.io logic (modularize this if it grows large)
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join a conversation room
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User joined conversation: ${conversationId}`);
  });

  // Handle sending/receiving messages
  socket.on('sendMessage', async (messageData) => {
    try {
      // Save to MongoDB (reuse your existing Message model)
      const newMessage = new chat({
        conversationId: messageData.conversationId,
        senderId: messageData.senderId,
        message: messageData.message,
        readStatus: false
      });
      await newMessage.save();

      // Broadcast to everyone in the conversation room
      io.to(messageData.conversationId).emit('newMessage', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});






const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
