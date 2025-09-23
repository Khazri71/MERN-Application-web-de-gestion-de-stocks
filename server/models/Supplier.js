import mongoose from "mongoose";


const SupplierSchema =  mongoose.Schema({
    supplierName : {type: String , require: true},
    supplierEmail : {type : String , require: true},
    supplierPhone : {type : String , require: true},
    supplierAddress : {type : String , require: true}
});

const SupplierModel = mongoose.model("Supplier" , SupplierSchema);


export default SupplierModel;