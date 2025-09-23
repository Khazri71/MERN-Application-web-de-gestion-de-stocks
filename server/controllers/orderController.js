import { populate } from "dotenv";
import OrderModel from "../models/Order.js";
import ProductModel from "../models/Product.js";


const addOrder = async (req ,res ) => {
    try{
       const { productId , quantity , total , orderDate} = req.body;
       const userId = req.user.id;

    const existProduct = await ProductModel.findById({_id : productId});
    if(!existProduct){
        return res.status(404).json({success : false , message : "Produit introuvable"});
    }
    if(quantity > existProduct.productStock){
        return res.status(409).json({success :flase ,message : "Stock insuffisant"});
    }else{
            existProduct.productStock -= parseInt(quantity);
          await existProduct.save();
    }

    const passOrder = new OrderModel({
        orderCustomer : userId , 
        orderProduct : productId,
        orderQuantity : quantity,
        orderTotal : total,
        orderDate
    })
    await passOrder.save();
    return res.status(200).json({success : true , message : "Commande ajoutée avec succès"});
 

    }catch(error) {
       console.log("Erreur serveur lors de l'ajout de la commande" , error);
       return res.status(500).json({success : false , message :" Erreur de serveur"});

    }
}


const getOrders = async (req ,res) => {
    try{
      const userId = req.user.id;
      
      let query = {};


      if(req.user.userRole === "client" ){
          query = {orderCustomer : userId};
      }

      const orders = await OrderModel.find(query).populate({path: "orderProduct" ,  populate : { path : "productCategoryId" , select : "categoryName"} , select : "productName  productPrice"}).populate("orderCustomer" , "userName userEmail");

      return res.status(200).json({success : true , data : orders})

    }catch(error){
       console.error("Erreur de serveur lors de l'affichage de commandes" , error);
       return res.status(500).json({success : false , message : "Erreur de serveur"});
    }
}

export {addOrder , getOrders}