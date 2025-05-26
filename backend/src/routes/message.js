const express = require("express");
const mongoose = require("mongoose");
const Message= require("../models/message.js")
const router = express.Router();

router.post("/send", async (req, res) => {
  const { senderId, receiverId, senderModel, receiverModel, message } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      senderModel,
      receiverModel,
      message
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});
router.get("/:userId/:lawyerId", async (req, res) => {
  const { userId, lawyerId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: lawyerId },
        { senderId: lawyerId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

//
router.get("/inbox/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const messages = await Message.find({
      senderId: userId,
      senderModel: "User"
    }).populate({
      path: "receiverId",
      select: "name email",
      model: "Lawyer" 
    });

    const uniqueLawyers = {};
    messages.forEach((msg) => {
      if (msg.receiverId && msg.receiverId._id) {
        uniqueLawyers[msg.receiverId._id] = msg.receiverId;
      }
    });

    const partners = Object.values(uniqueLawyers);
    res.json({ success: true, partners });

  } catch (error) {
    console.error("User inbox error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// For lawyer inbox
router.get("/inbox/lawyer/:lawyerId", async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;
   

    // Step 1: Fetch raw messages
    const messages = await Message.find({
      receiverId: lawyerId,
      receiverModel: "Lawyer"
    });

    

    if (messages.length === 0) {
      return res.json({ success: true, partners: [] });
    }

    // Step 2: Try populating manually
    const populated = await Message.find({
      receiverId: lawyerId,
      receiverModel: "Lawyer"
    }).populate({
      path: "senderId",
      model: "User",
      select: "name email"
    });

    
    populated.forEach((msg, i) => {
      console.log(`   [${i}] From:`, msg.senderId?.name || "undefined");
    });

    const uniqueUsers = {};
    for (const msg of populated) {
      if (msg.senderId && msg.senderId._id) {
        uniqueUsers[msg.senderId._id.toString()] = msg.senderId;
      }
    }

    const partners = Object.values(uniqueUsers);
    console.log(" Final unique partners:", partners.map(p => p.name));

    res.json({ success: true, partners });
  } catch (err) {
    console.error("Lawyer inbox route failed:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});





module.exports=router;

