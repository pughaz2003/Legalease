const validator = require("validator");


const allowedRoles = ["user", "lawyer"];
const validateRegister = (req)=>{

    const {name,email,password,role} = req.body;
   

if(!name ){
    throw new Error("enter a valid details");
}else if(!validator.isEmail(email)){
    throw new Error("invalid  email credentials");
}else if(!validator.isStrongPassword(password)){
    throw new Error("invalid password credentials"); 
}else  if ( !allowedRoles.includes(role)) {
    throw new Error("Invalid crediantial in role");
  }


}

const validateRegLawyer = (req)=>{

    const {name,email,password,role,licenseNumber,specialization} = req.body;
   

if(!name ){
    throw new Error("enter a valid details");
}else if(!validator.isEmail(email)){
    throw new Error("invalid  email credentials");
}else if(!validator.isStrongPassword(password)){
    throw new Error("invalid password credentials"); 
}

if (role !== "lawyer") {
    throw new Error("Only lawyers can register here");
}


if (!licenseNumber || !specialization) {
    throw new Error("Lawyers must provide a license number and specialization");
}
}
module.exports = {
    validateRegister,validateRegLawyer
}