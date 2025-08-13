const users=require("../userSignupSchema")

const getAllUsers = async (req, res, next) => {
    try{
        const Users = await users.find();
        console.log(Users);
        if(!Users || Users.length ===0){

            return res.status(404).json({message:"no user found"});
        }
        return res.status(200).json(Users);
    }
    catch(error){
        next(error);
    }
}

// admin-controller.js
module.exports = getAllUsers;
