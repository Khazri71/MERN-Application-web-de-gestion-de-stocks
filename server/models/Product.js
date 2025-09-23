import mongoose from "mongoose";
import CategoryModel from "./Category.js";
import SupplierModel from "./Supplier.js";

const ProductSchema = mongoose.Schema({
      productName : {type : String , require : true},
      productCategoryId : {type : mongoose.Types.ObjectId , ref : "Category" , require : true},
      productSupplierId : {type : mongoose.Types.ObjectId , ref : "Supplier" , require : true},
      isDeleted : {type : Boolean , default : false},
      productPrice : {type : Number , require : true},
      productStock : {type : Number , require : true}
});

const ProductModel = mongoose.model("Product" , ProductSchema);


export default ProductModel;