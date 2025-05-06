const User = require("../models/user.js");

const saveUserLocation = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: "Point",
          coordinates: [longitude, latitude], 
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Location saved", location: updatedUser.location });
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { saveUserLocation };
