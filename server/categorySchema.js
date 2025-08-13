const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
hostelRoomImage:String,
hostelTitle:String
});

// module.exports=mongoose.model('categories',categorySchema);

module.exports=mongoose.model('bookingdetails',categorySchema);
// module.exports=mongoose.model('bookingDetail',categorySchema,'bookingDetail');