const mongoose = require ('mongoose');
const bedDetailSchema = require('./bedDetailSchema');

const roomSchema=new mongoose.Schema({

    
roomImage1:String,
roomImage2:String,
roomImage3:String,
roomImage4:String,
availableroom:[bedDetailSchema]

})

module.exports=roomSchema;