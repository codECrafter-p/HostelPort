const express = require("express");
// const movielist=require('../server/movielist.json');
const mangodb=require('./DB');
const categorySchema=require('./categorySchema');
const userSignupSchema= require('./userSignupSchema');
const cors=require('cors');
const app = express();
const axios =require('axios');
const hostelRoomSchema = require("./hostelRoomSchema");
const hostelDetailSchema=require('./hostelDetailSchema')
const adminRoute = require("./router/admin-router");


//Middleware
app.use(cors());
app.use(express.json());


mangodb();  


app.get('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})



app.get('/home',async(req,res)=>{
  categorySchema.find({})
   .then(category=>{
    res.json(category);
    console.log("category",category);
   })
});

//Signup ka api
app.post("/signup",(req,res)=>{

try{
    const {name,phoneno,email,password}=req.body;
  //schema k object banayenge
  const newUser=new userSignupSchema({name,phoneno,email,password});
  newUser.save();
  console.log("Registered Success");
  res.status(201).json({ message: "Registered Success" });
}
catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }

});

//login ka api
app.post("/login",async(req,res)=>{
 const{email,password}=req.body;

 const userexist=await userSignupSchema.findOne({email});

 if(userexist){
    if(userexist.password===password)
    {
      res.json({
        message:"success",
        user:{
          id:userexist._id,
          name:userexist.name,
          email:userexist.email

        }
      });
      console.log("success");
    }else{
      res.json({message:"incorrect"});
      console.log("passwor is incorrect");
    }
  }
  else{
      res.json({message:"not exist"});
      console.log("user not exist");
   }
      

});

//hostelroom k api
    app.get("/hostelroom",(req,res)=>{

      hostelRoomSchema.find({})
      .then(RoomData=>{
        res.json(RoomData);
        console.log("room",RoomData);
      })

    })


    //hosteldetails k api
    app.get("/hosteldetails",(req,res)=>{

      hostelDetailSchema.find({})
      .then(hostelData=>{
        res.json(hostelData);
        console.log("hostel",hostelData);
      })

    })

    

    //roomdetails k api
    app.get("/roomdetails/:id/details",(req,res)=>{

      hostelDetailSchema.findById(req.params.id)
      .then(hostelData=>{
        res.json(hostelData);
        console.log("hostel",hostelData);
      })

    })


    app.use("/api/auth",adminRoute);


// categorySchema.find({})
//     .then(category=>{
//         console.log(category);
//     })


// const tree = () => {
//   console.log("local server is running");
// };

const port =  process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// app.listen(port, tree);


