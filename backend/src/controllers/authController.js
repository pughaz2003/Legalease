
const User = require("../models/user.js");
const Lawyer = require("../models/lawyer.js");
const {validateRegister, validateRegLawyer} = require("../utils/validation.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")





const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

   
    await validateRegister(req);

    const hashedPassword =await bcrypt.hash(password,10);

    const user = new User({ name, email, password:hashedPassword, role });

 
    console.log(hashedPassword);

    await user.save();

    res.send("user added successfully")
  } catch (error) {
    console.error(error); 
    

    res.status(400).json({ message: error.message }); 
  }
};

 //lawyer registration
 const registerLawyer = async (req, res) => {
   try {
     const { name, email, password ,role,phone,licenseNumber,specialization,location,proBono } = req.body;

  await validateRegLawyer(req);

  const hashPassword = await bcrypt.hash(password,10)

  const lawyer = new Lawyer({name,email,password:hashPassword,role,phone,licenseNumber,specialization,location,proBono});

  await lawyer.save();

  res.send("user added successfully")
  
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };


// common login for user & lawyer
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const lawyer = user ? null : await Lawyer.findOne({ email }); 

    if (!user && !lawyer) return res.status(400).json({ message: "Invalid credentials" });

    const account = user || lawyer;
    const role = user ? "user" : "lawyer";

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: account._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    
    res.cookie("token", token, { httpOnly: true, 
      maxAge: 3600000,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production' });

      res.json({
        message: "Login successful",
        token,
        account: {
          _id: account._id,
          name: account.name,
          email: account.email,
          role:role 
        }
      });
      
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerUser, registerLawyer, login };
