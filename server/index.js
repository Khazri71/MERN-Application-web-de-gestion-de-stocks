import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js";
import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import dashboardRoutes from "./routes/dashboard.js";


dotenv.config();

const app = express();
app.use(cors({
  origin: "https://ton-frontend.onrender.com"
}));
app.use(express.json());

// Hello
app.get('/', (req, res) => {
  res.send('Hello');
});


app.use("/api/auth/" , authRoutes);
app.use("/api/category" , categoryRoutes);
app.use("/api/supplier" , supplierRoutes);
app.use("/api/product" , productRoutes);
app.use("/api/user" , userRoutes);
app.use("/api/order" , orderRoutes);
app.use("/api/dashboard" , dashboardRoutes);



app.listen(3001 , () => {
    connectDB();
    console.log("Server is Running");
})
