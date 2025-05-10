const mongoose = require("mongoose");
const validator = require("validator");
const userSchema =new mongoose.Schema({
    name: 
    { 
        type: String,
        required: true,
        minLength:5,
        maxLength:14,
    },
   
    email:
     { 
       type: String,
       required: true,
       unique: true ,
       index:true,
       lowercase:true,
       trim:true,
       validator(value){
     if(!validator.isEmail(value)){
      throw new Error("invalid email address: " + value);
     }
       }
    },
    password:
     { 
        type: String,
        required: true
             },
    role:
     {
         type: String,
         enum: ["user", "lawyer"],
         required: true
         },

         location: {
          type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
          },
          coordinates: {
            type: [Number],
            default: [0, 0],
          },
        },
        photoUrl:{
          type:String,
          required:true
        }
        
        

             
});

userSchema.index({ location: '2dsphere' });


module.exports = mongoose.model("User",userSchema);
