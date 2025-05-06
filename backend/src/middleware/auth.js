const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Lawyer = require("../models/lawyer.js");

const adminAuth = async (req, res, next) => {
    try {

        console.log('Token from cookies:', req.cookies.token);
        console.log('Token from header:', req.headers.authorization);

        // let token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        
        
        const { _id, role } = decodedObj;

        let user;
        if (role === "user") {
            user = await User.findById(_id);
        } else if (role === "lawyer") {
            user = await Lawyer.findById(_id);
        }

        if (!user) {
            return res.status(404).json({ message: "User/Lawyer does not exist" });
        }

        req.user = user;
        req.role = role;
        next();
    } catch (err) {
        res.status(401).json({ message: "ERROR: " + err.message });
        
    }
};

module.exports = { adminAuth };
