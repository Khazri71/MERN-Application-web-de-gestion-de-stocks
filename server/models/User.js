import mongoose from "mongoose";


const UserSchema =  new mongoose.Schema({
    userName : {type: String , require: true},
    userEmail : {type: String , require: true , unique : true},
    userPassword : {type: String , require: true },
    userAddress : {type: String , require: true},
    userRole : {type: String , enum: ["admin" , "client"] , default: "client"}

    
})


const UserModel = mongoose.model("User" , UserSchema)



export default UserModel