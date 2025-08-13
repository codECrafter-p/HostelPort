const mongoose=require("mongoose");


const signupSchema=new mongoose.Schema({
    name:String,
    phoneno:Number,
    email:String,
    password:String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

});

module.exports=mongoose.model("users",signupSchema);