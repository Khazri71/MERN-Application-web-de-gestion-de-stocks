import ProductModel from "../models/Product.js";
import CategoryModel from "../models/Category.js";
import SupplierModel from "../models/Supplier.js";



const addProduct = async (req , res) => {

    const {productName,productCategoryId,productSupplierId,productPrice,productStock} = req.body;

    try{
        const existProduct = await ProductModel.findOne({productName});
        if(existProduct) {
            return res.status(409).json({success : true , message : "Produit déjà existe"});
        }

        const newproduct = new ProductModel({
            productName ,
            productCategoryId ,
            productSupplierId ,
            productPrice ,
            productStock
        })
        await newproduct.save();
        return res.status(200).json({success : true , message :"Produit ajouté avec succés" , data: newproduct});

    }catch(error){
       console.log("Erreur de serveur lors de l'ajout de l'ajout de produit" , error);
       return res.status(500).json({success : false , message : "Erreur de serveur"})
    }

}


const getProducts = async (req , res) => {
    try{
        const categories = await CategoryModel.find();
        const suppliers = await SupplierModel.find();

        const products = await ProductModel.find({isDeleted : false}).populate("productCategoryId").populate("productSupplierId");
        return res.status(200).json({success : true ,  products , categories , suppliers});

    }catch(error){
        console.log("Erreur de serveur lors de l'affichage de produits" , error);
        return res.status(500).json({success : false , message : "Erreur de serveur"});
    }
}


const updateProduct = async (req , res) => {
    try {
        const {id} = req.params;
        const {productName,productCategoryId,productSupplierId,productPrice,productStock} = req.body;


        const existProduct = await ProductModel.findById(id);
        if(!existProduct){
            return res.status(404).json({success: true , message : "Produit introuvable"});
        }
        const updatedProduct = await ProductModel.findByIdAndUpdate(id , {productName,productCategoryId,productSupplierId,productPrice,productStock});
        return res.status(200).json({success: true , message: "Produit modifié avec succès" , data : updatedProduct})

    }catch(error){
        console.log("Erreur de serveur lors de la modification de produit" , error);
        return res.status(500).json({success : false , message:"Erreur de serveur"});
    }

}


const deleteProduct = async  (req , res )  => {
   try{
    const {id} = req.params;
    const existProduct = await ProductModel.findById(id);
    if(!existProduct){
        return res.status(404).json({success : true , message : "Produit introuvable"});
    }

    if(existProduct.isDeleted){
        return res.status(204).json({success : true , message : "Produit est déjà supprimé"});
    }

    // await ProductModel.findByIdAndDelete(id);
    await ProductModel.findByIdAndUpdate(id , {isDeleted : true});
    return res.status(200).json({success : true , message : "Produit supprimé avec succès"});

   }catch(error){
    console.log("Erreur de serveur lors de la suppression de produit" , error);
    return res.status(500).json({success : false , message :"Erreur de serveur"});
   }
}


export { addProduct , getProducts , updateProduct , deleteProduct }