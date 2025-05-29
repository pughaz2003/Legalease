const mongoose = require("mongoose");

const proBonoLawyerSchema = new mongoose.Schema({
  name:
   { type: String,
     required: true },
  email: 
  { type: String,
     required: true },
  licenseNumber: 
  { type: String,
     required: true },
  specialization: { type: String,
     required: true },
  address: { type: String },
   availability: { type: String },
  proBono: { type: Boolean,
     default: true },
});

module.exports = mongoose.model("ProBonoLawyer", proBonoLawyerSchema);
