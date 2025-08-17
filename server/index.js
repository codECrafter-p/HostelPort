// const express = require("express");
// // const movielist=require('../server/movielist.json');
// const mangodb=require('./DB');
// const categorySchema=require('./categorySchema');
// const userSignupSchema= require('./userSignupSchema');
// const cors=require('cors');
// const app = express();
// const axios =require('axios');
// const hostelRoomSchema = require("./hostelRoomSchema");
// const hostelDetailSchema=require('./hostelDetailSchema')
// const adminRoute = require("./router/admin-router");

// // const serverless=require("serverless-http");

// //Middleware
// // app.use(cors());

// app.use(cors({
//   origin: ["https://hostelport.netlify.app"], // your frontend domain
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());


// mangodb();  


// app.get('/',(req,res)=>{
//   res.send({
//     activeStatus:true,
//     error:false,
//   })
// })



// app.get('/home',async(req,res)=>{
//   categorySchema.find({})
//    .then(category=>{
//     res.json(category);
//     console.log("category",category);
//    })
// });

// //Signup ka api
// app.post("/signup",(req,res)=>{

// try{
//     const {name,phoneno,email,password}=req.body;
//   //schema k object banayenge
//   const newUser=new userSignupSchema({name,phoneno,email,password});
//   newUser.save();
//   console.log("Registered Success");
//   res.status(201).json({ message: "Registered Success" });
// }
// catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error registering user" });
//     }

// });

// //login ka api
// app.post("/login",async(req,res)=>{
//  const{email,password}=req.body;

//  const userexist=await userSignupSchema.findOne({email});

//  if(userexist){
//     if(userexist.password===password)
//     {
//       res.json({
//         message:"success",
//         user:{
//           id:userexist._id,
//           name:userexist.name,
//           email:userexist.email

//         }
//       });
//       console.log("success");
//     }else{
//       res.json({message:"incorrect"});
//       console.log("passwor is incorrect");
//     }
//   }
//   else{
//       res.json({message:"not exist"});
//       console.log("user not exist");
//    }
      

// });

// //hostelroom k api
//     app.get("/hostelroom",(req,res)=>{

//       hostelRoomSchema.find({})
//       .then(RoomData=>{
//         res.json(RoomData);
//         console.log("room",RoomData);
//       })

//     })


//     //hosteldetails k api
//     app.get("/hosteldetails",(req,res)=>{

//       hostelDetailSchema.find({})
//       .then(hostelData=>{
//         res.json(hostelData);
//         console.log("hostel",hostelData);
//       })

//     })


    

//     //roomdetails k api
//     app.get("/roomdetails/:id/details",(req,res)=>{

//       hostelDetailSchema.findById(req.params.id)
//       .then(hostelData=>{
//         res.json(hostelData);
//         console.log("hostel",hostelData);
//       })

//     })


//     app.use("/api/auth",adminRoute);


// // categorySchema.find({})
// //     .then(category=>{
// //         console.log(category);
// //     })


// // const tree = () => {
// //   console.log("local server is running");
// // };

// const port =  process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// // app.listen(port, tree);

// // module.export=app;
// // module.exports.handler=serverless(app);



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// Schemas
const categorySchema = require("./categorySchema");
const userSignupSchema = require("./userSignupSchema");
const hostelRoomSchema = require("./hostelRoomSchema");
const hostelDetailSchema = require("./hostelDetailSchema");
const adminRoute = require("./router/admin-router");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (allow Netlify + local dev)
app.use(cors({
  origin: [
    "http://localhost:3000",       // React local dev
    "https://hostelport.netlify.app" // Netlify frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};
connectDB();

// ✅ Routes
app.get("/", (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// Fetch all categories
app.get("/home", async (req, res) => {
  try {
    const category = await categorySchema.find({});
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, phoneno, email, password } = req.body;
    const newUser = new userSignupSchema({ name, phoneno, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registered Success" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userexist = await userSignupSchema.findOne({ email });

  if (!userexist) {
    return res.json({ message: "not exist" });
  }

  if (userexist.password === password) {
    return res.json({
      message: "success",
      user: {
        id: userexist._id,
        name: userexist.name,
        email: userexist.email,
      },
    });
  } else {
    return res.json({ message: "incorrect" });
  }
});

// Hostel Rooms
app.get("/hostelroom", async (req, res) => {
  try {
    const roomData = await hostelRoomSchema.find({});
    res.json(roomData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// Hostel Details
app.get("/hosteldetails", async (req, res) => {
  try {
    const hostelData = await hostelDetailSchema.find({});
    res.json(hostelData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching hostels" });
  }
});

// Room Details by ID
app.get("/roomdetails/:id/details", async (req, res) => {
  try {
    const hostelData = await hostelDetailSchema.findById(req.params.id);
    res.json(hostelData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching room details" });
  }
});

// Admin Routes
app.use("/api/auth", adminRoute);

const port = process.env.PORT || 5000;

// ✅ Detect if running on Vercel
if (process.env.VERCEL) {
  module.exports = app; // Export app for serverless
} else {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}
