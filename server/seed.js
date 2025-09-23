import connectDB from "./db/connection.js";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt"





const register = async () => {
   try{
    connectDB();
    const hashPassword = await bcrypt.hash("admin" , 10);
    const newUser = new UserModel({
        userName: "admin",
        userEmail: "admin888@gmail.com",
        userPassword: hashPassword,
        userAddress: "Tunis, Manouba",
        userRole : "admin"
    })
    await newUser.save();
        console.log("Admin créé avec succés");
   }catch(err){
        console.log(err)
   }
}


register();