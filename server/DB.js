require("dotenv").config();
const mongoose=require('mongoose');


async function mongoconnect() {
    
    try{
        
        await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("mongoose connected");
    }
    catch(error){
        console.log("mongo error:"+error);
        process.exit(1);
    }
}
module.exports=mongoconnect; 