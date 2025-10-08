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
  origin: [
    "https://mern-application-web-de-gestion-de-0ml9.onrender.com", // ton frontend Render
    "http://localhost:5173" // pour le développement local
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
