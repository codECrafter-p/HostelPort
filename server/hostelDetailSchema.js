const mongoose = require ('mongoose');
const roomDetailSchema = require('./roomDetailSchema');

const hostelSchema=new mongoose.Schema({

    
hostelImage:String,
hostelTitle:String,
hostelPrice:String,
details:[roomDetailSchema]

})

module.exports=mongoose.model('hosteldetails',hostelSchema);