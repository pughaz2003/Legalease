const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true
  },
  title: {
    type: String  
  },
  description: {
    type: String  
  },
  category: {
    type: String  
  },
  files: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Case", caseSchema);
