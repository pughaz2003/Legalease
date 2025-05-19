const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  conversationId: 
  { type: String,
     required: true }, 
  senderId: 
  { type: String, 
    required: true },      
  message:
   { type: String,
     required: true },       
  timestamp: 
  { type: Date, 
    default: Date.now },    
  readStatus:
   { type: Boolean,
     default: false }    
}, 
{ strict: true }); 

module.exports = mongoose.model('ChatMessage', chatMessageSchema);