import mongoose, { Types } from "mongoose";


const UserSchema =  new mongoose.Schema({
    name : {type: String , require: true},
    email : {type: String , require: true , unique : true},
    password : {type: String , require: true },
    address : {type: String , require: true},
    role : {type: String , enum: ["admin" , "customer"] , default: "customer"}

    
})


const UserModel = mongoose.model("users" , UserSchema)



export default UserModel