import express from "express";
import { addUser, getUsers , deleteUser , getUser , updateUser} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();
router.post("/add" , authMiddleware, addUser);
router.get("/" , authMiddleware , getUsers);
router.delete("/:id" , authMiddleware , deleteUser);
router.get("/profile" , authMiddleware , getUser);
router.put("/update" , authMiddleware , updateUser)



export default router;