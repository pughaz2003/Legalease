const ProBonoLawyer = require("../models/proBonoLawyer.js");

const registerProBono = async (req, res) => {
  try {
    const { name, email, licenseNumber, specialization, address,availability } = req.body;

    if (!name || !email || !licenseNumber || !specialization||!availability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await ProBonoLawyer.findOne({ email, licenseNumber });
    if (existing) {
      return res.status(409).json({ message: "Already registered as Pro Bono Lawyer" });
    }

    const newLawyer = new ProBonoLawyer({
      name,
      email,
      licenseNumber,
      specialization,
      address,
      availability,
    });

    await newLawyer.save();

    res.status(201).json({ message: "Pro bono registration successful" });
  } catch (err) {
    console.error("Error registering pro bono lawyer:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerProBono };
