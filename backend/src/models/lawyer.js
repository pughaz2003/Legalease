 const mongoose = require("mongoose");

 const lawyerSchema = new mongoose.Schema({
 name:
  { 
     type: String, 
     required: true,
    maxLength:14,
   minLength:5

},
email:
    {
     type: String,
      required: true, 
     unique: true
    
    },
 password:
   { 
   type: String, 
     required: true 
  },
phone:
  {
     type: String,
      
      },
   specialization:
    {
      type: String, 
     required: true,
     enum: ["criminal", "corporate", "civil", "family", "tax"]
      }, 

      licenseNumber:
       {
       type: String,
       required: true,
       unique: true
   },
 
   location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],  
      required: true
    }
  },
  role: {
    type: String,
    enum: ["user", "lawyer"],
    default: "lawyer",
    required: true
  },



  
   proBono: {
     type: Boolean,
     default: false
   },
   photoUrl:{
    type:String,
    
   }


});


 lawyerSchema.index({ location: "2dsphere" });
  
        
 





const Lawyer = mongoose.model("Lawyer", lawyerSchema);
 module.exports = Lawyer;

