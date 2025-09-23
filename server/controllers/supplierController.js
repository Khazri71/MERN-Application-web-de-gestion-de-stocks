
import ProductModel from "../models/Product.js";
import SupplierModel from "../models/Supplier.js";


const addSupplier = async (req , res) => {

    try{
        const {supplierName , supplierEmail , supplierPhone , supplierAddress} = req.body;

        const existSupplier = await  SupplierModel.findOne({supplierName});
        if(existSupplier){
            return res.status(409).json({success: true , message: "Fournisseur déjà existe"});
        }

        const newSupplier = new SupplierModel({
            supplierName , 
            supplierEmail , 
            supplierPhone ,
            supplierAddress
        });

        await newSupplier.save();
        return res.status(200).json({success: true , message: "Fournisseur ajouté avec succès" , data : newSupplier});


    }catch(error){
        console.log("Erreur de serveur lors de l'ajout du fournisseur" , error);
        return res.status(500).json({success: false , message: "Erreur de serveur"})

    }


};


const getSuppliers = async (req , res) => {
  try{
    const suppliers = await SupplierModel.find();
    return res.status(200).json({success: true , data : suppliers });

  }catch(error){
    console.log("Erreur de serveur lors de l'affichage de fournisseurs" , error);
    return res.status(500).json({success: false , message: "Erreur de serveur"});
  }
}


const updateSupplier = async (req , res) => {
  try{
    const {id} = req.params;
    const {supplierName, supplierEmail, supplierPhone, supplierAddress} = req.body; 

    const existSupplier = await SupplierModel.findById(id);
    if(!existSupplier){
      return res.status(404).json({success:true , message:"Fournisseur introuvable"});
    }
    
    const updatedSupplier = await SupplierModel.findByIdAndUpdate( id , {supplierName, supplierEmail, supplierPhone, supplierAddress});
    return res.status(200).json({success : true , message:"Fournisseur modifié avec succès", data: updatedSupplier})


  }catch(error){
    console.log("Erreur de serveur lors de modification du fournisseur " , error)
    return res.status(500).json({success:false , message : "Erreur de serveur"})
  }
}


const deleteSupplier = async (req , res) => {
  try{
    const {id} = req.params;

    const productCountWithThisSupplier = await ProductModel.countDocuments({productSupplierId : id});
     if(productCountWithThisSupplier > 0){
          return res.status(400).json({success : false , message :  "Vous pouvez pas supprimé cette fournisseur associée aux produits"});
     }




    const existSupplier = await SupplierModel.findById(id);
    if(!existSupplier){
      return res.status(404).json({success : true , message : "Fournisseur introuvable"});
    }
    await SupplierModel.findByIdAndDelete(id);
    return res.status(200).json({success:true , message : "Fournisseur supprimé avec succès" })

  }catch(error){
    console.log("Erreur de serveur lors de suppression de fournisseur" , error);
    return res.status(500).json({success:false , message : "Erreur de serveur"})
  }
}


export {addSupplier , getSuppliers , updateSupplier , deleteSupplier}