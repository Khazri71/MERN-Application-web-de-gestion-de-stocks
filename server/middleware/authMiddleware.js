import jwt, { decode } from "jsonwebtoken";
import UserModel from "../models/User.js";

const authMiddleware = async (req , res ,next) => {
    try{
 
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({success : false , message : "Token non fourni"});
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({success : false , message : "Token invalide"});
    }

    const user = await UserModel.findById({_id : decoded.id});
    if(!user){
        return res.status(401).json({success : false , message : "Utilisateur introuvable"});
    }
    
    req.user = user;
    next();


    }catch(error){
        console.error("Erreur dans authMiddleware" , error);
        return res.status(401).json({succes : false , message : "Erreur interne dans middleware"});

    }
}

export default authMiddleware;