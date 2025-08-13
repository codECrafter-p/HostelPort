const mongoose = require ('mongoose');

const roomSchema=new mongoose.Schema({

    
hostelRoomImage:String,
hostelRoomNo:String,
hostelRoomPrice:String

})

module.exports=mongoose.model('hostelrooms',roomSchema);