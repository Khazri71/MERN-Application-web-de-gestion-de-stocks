import express from "express";
import {addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();



router.post("/add" , authMiddleware ,addProduct);
router.get("/" , authMiddleware , getProducts );
router.put("/:id" , authMiddleware , updateProduct);
router.delete("/:id" , authMiddleware , deleteProduct)


export default router;

