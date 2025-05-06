const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Lawyer = require("../models/lawyer.js");

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, role } = decoded;

    let account;
    if (role === "user") {
      account = await User.findById(_id).select("-password");
    } else if (role === "lawyer") {
      account = await Lawyer.findById(_id).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!account) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ role, account });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
