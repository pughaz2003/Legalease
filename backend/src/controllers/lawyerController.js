const Lawyer = require('../models/lawyer.js');

const getNearbyLawyers = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Coordinates are required." });
    }

    const lawyers = await Lawyer.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000 // 10 km radius
        }
      }
    });

    res.status(200).json(lawyers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getNearbyLawyers
};
