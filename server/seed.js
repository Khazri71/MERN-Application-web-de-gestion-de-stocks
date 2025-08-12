import connectDB from "./db/connection.js";
import UserModel from "./models/User.js";
import bcrypt from "bcrypt"





const register = async () => {
   try{
    connectDB();
    const hashPassword = await bcrypt.hash("admin" , 10);
    const newUser = new UserModel({
        name: "admin",
        email: "admin123@gmail.com",
        password: hashPassword,
        address: "Tunis, Manouba",
        role : "admin"
    })
    await newUser.save();
        console.log("Admin créé avec succés");
   }catch(err){
        console.log(err)
   }
}


register();