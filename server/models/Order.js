import mongoose from "mongoose";


const OrderSchema = mongoose.Schema({

   orderCustomer :  {type : mongoose.Schema.Types.ObjectId , ref : "User" , require : true} ,
   orderProduct :{type : mongoose.Schema.Types.ObjectId , ref: "Product" , require :true} ,
   orderQuantity : {type : Number , require :true},
   orderTotal : {type: Number , require : true} ,
   orderDate : {type : Date , default : Date.now}


});


const OrderModel = mongoose.model("Order" , OrderSchema);


export default OrderModel;