const express = require("express");
const getAllUsers=require("../controllers/admin-controller")

// const verifyAdmin = require("../middlewares/verifyAdmin");

const router=express.Router();

// router.get("/users", verifyAdmin, getAllUsers);

router.route('/users').get(getAllUsers);

module.exports=router;