import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async() => {
     try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("Connection created successfully");
     }catch(error){
      console.log("Connection failed" , error.message);
      process.exit(1);
     }

}

export default connectDB;