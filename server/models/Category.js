import mongoose from "mongoose";


const CategorySchema = mongoose.Schema({
    categoryName : {type: String , require : true},
    categoryDescription : {type : String , require : true}
});


const CategoryModel = mongoose.model("categories" , CategorySchema);


export default CategoryModel;