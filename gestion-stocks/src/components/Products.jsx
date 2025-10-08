import axios from "axios";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


export const Products = () => {
  const [addEditModal , setAddEditMoadal] =  useState(null);
    const [formData , setFormData] = useState({
      productName : "",
      productCategoryId : "",
      productSupplierId : "",
      productPrice : "",
      productStock : ""
    });
      const [categories , setCategories] = useState([]);
     const [suppliers , setSuppliers] = useState([]);
     const [products , setProducts] = useState([]);
     const [addProduct , setAddProduct] = useState(false);
     const [editProduct , setEditProduct] = useState(null);
     const [filtredProducts , setFiltredProducts] = useState(products);
    const [isLoading , setIsLoading] = useState(false);


   

      const handleChange = (e) => {
     const {name , value} = e.target;
     setFormData((prev) => ({
         ...prev,
         [name] : value
     }));
  }

    const handleAddProduct = () => {
    setAddProduct(true)
    setAddEditMoadal(1)
  }



   const handleCancelData = () => {
    setFormData({
       productName : "",
      productCategoryId : "",
      productSupplierId : "",
      productPrice : "",
      productStock : ""
    })
  }
    const handleCloseModal = () => {
    if(addProduct) setAddProduct(false)
    if(editProduct)  setEditProduct(false)
    setAddEditMoadal(null)
    handleCancelData()
  }







  const handleSubmitProduct = async (e) => {
     e.preventDefault();
    
     if(editProduct){
      //Modifier produit par id
      console.log("Produit Id" , editProduct);
      try{
         const response = await axios.put(`${import.meta.env.VITE_BASE_URL}api/product/${editProduct}` , formData , 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("info-token")}`,
            }
          }
         );

        const data =  response.data;
        if(data.success){
          alert(data.message);
           handleGetProducts();
           handleCloseModal();
  
        }else{
          alert(data.message);
        }




      }catch(error){
        console.error( "Erreur de serveur" , error);
      }


     } else{  
       //Ajouter produit 

           try {
     const response = await  axios.post( `${import.meta.env.VITE_BASE_URL}api/product/add` , formData , 
      {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("info-token")}`,
        }
      }
     );

     const data = response.data;
     if(data.success){
      alert(data.message);
         handleCloseModal()
      handleGetProducts()
     }else{
      alert(data.message);
     }
  
  }catch(error){
     console.error("Erreur de serveur :", error);
  }


     }


}











const handleGetProducts = async () => {
   try{
    setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/product` , 
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("info-token")}`,
          }
        }
      );

      const data = await response.data;
      if(data.success){
        setIsLoading(false)
        setProducts(data.products);
        setFiltredProducts(data.products);
        setCategories(data.categories);
        setSuppliers(data.suppliers);
        console.log(categories , suppliers);
      }else{
        setIsLoading(false);
        console.error(data.message);
      }
   }catch(error){
    console.error("Erreur de serveur :" , error);
   }
}

useEffect (() => {
 handleGetProducts();
}, [])



  const handleEditProduct = (product) => {
    setEditProduct(product._id)

    setFormData({
       productName :  product.productName ,
      productCategoryId : product.productCategoryId._id ,
      productSupplierId : product.productSupplierId._id ,
      productPrice : product.productPrice ,
      productStock : product.productStock
    })

    setAddEditMoadal(1)

  }



  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet produit ?");
    console.log(confirmDelete);
    if(confirmDelete){
      try{
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}api/product/${id}` , 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("info-token")}`,
            }
          }
        );

        if(response.data.success ){
          console.log(response.data.message);
           handleGetProducts()
        }else{
          console.log(response.data.message);
        }

      }catch(error){
        console.error("Ereur de serveur" , error);
      }
    }
  }


  const  handleSearchProductsByName = (e) => {
    
    setFiltredProducts(
      products.filter((product) => product.productName.toLowerCase().includes(e.target.value) )
    )
  }

   if(isLoading) return <div>chargement...</div>

  return (
      <>
       <h1 className=" text-2xl font-bold my-5 ml-5">
          Gestion des produits
        </h1>

         <div className="flex justify-between items-center">

           <div className="ml-5 bg-white w-2/6 px-2 py-1 rounded-lg border border-gray-300 flex items-center ">
       <input type="text"  placeholder="Chercher produits par nom ..."   className="focus:outline-none w-full " 
        onChange={handleSearchProductsByName} 
       /><IoSearch />
     </div>
  
        <div className="flex justify-between mx-5 my-5">
          
          <button className="cursor-pointer block text-sm/6 font-medium bg-violet-700 hover:bg-violet-600 text-white py-2 px-3 rounded-lg"  
          onClick={handleAddProduct}
          > 
            Ajouter Produit
          </button>
        </div>
       </div>
  
      {/* Modal  */}
      {addEditModal && (
  
   <div className="flex justify-center items-center fixed  h-full w-full top-0 left-0  bg-black/40 ">
    <div className="w-1/3 bg-white p-5 rounded-lg relative" >
    <h2 className=" text-lg font-bold mb-3"> 
      {addProduct && "Ajouter Produit"}
      {editProduct && "Modifier Produit"}
      
      </h2>
     <button className="cursor-pointer absolute top-5 right-5" onClick={handleCloseModal}><IoClose size={20} /></button>
          <form onSubmit={handleSubmitProduct}
          className="flex flex-col space-y-4  ">
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="nameFour"
                    className="block text-sm/6 font-medium "
                  >
                    Nom 
                  </label>
                  <div className="mt-2">
                    <input
                      id="nameFour"
                      type="text"
                      placeholder="Entrer le nom du produit"
                      required
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1-outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border  border-black"
                      onChange={handleChange}
                      name = "productName"
                      value={formData.productName}
                    />
                  </div>
                </div>
  
  
  
                 <div className="mb-4">
                  <label
                    htmlFor="emailFour"
                    className="block text-sm/6 font-medium "
                  >
                    Catégorie
                  </label>
                  <div className="mt-2">
                     <select name="productCategoryId" 
                       onChange={handleChange}
                       value={formData.productCategoryId}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border  border-black"
                     >
                      <option value="">Choisir Catégorie</option>
                       {categories && categories.map((categorie) => (
                           <option key={categorie._id} value={categorie._id}>{categorie.categoryName}</option>
                       ))}
                    
                        
                    </select>
                  </div>
                </div>
  
  
                 <div className="mb-4">
                  <label
                    htmlFor="telFour"
                    className="block text-sm/6 font-medium "
                  >
                    Fournisseur
                  </label>
                  <div className="mt-2">
                    <select name="productSupplierId"
                    onChange={handleChange} 
                    value={formData.productSupplierId}
                     className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border  border-black"
                    >
                      <option value="">Choisir Fournisseur</option>
                      {suppliers && suppliers.map((supplier) => (
                           <option key={supplier._id} value={supplier._id}>{supplier.supplierName}</option>
                      ))}


                      
                       
                    </select>
                  </div>
                </div>


                
  
                 <div className="mb-4">
                  <label
                    htmlFor="telFour"
                    className="block text-sm/6 font-medium "
                  >
                    Prix
                  </label>
                  <div className="mt-2">
                    <input
                      id="telFour"
                      type="number"
                      min= "0"
                      placeholder="Entrer le prix du produit"
                      required
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border  border-black"
                      onChange={handleChange}
                      name="productPrice"
                      value={formData.productPrice}
                    />
                  </div>
                </div>


                
  
                 <div className="mb-4">
                  <label
                    htmlFor="telFour"
                    className="block text-sm/6 font-medium "
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <input
                      id="telFour"
                      type="number"
                      min= "0"
                      placeholder="Entrer le stock du produit"
                      required
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border  border-black"
                      onChange={handleChange}
                      name="productStock"
                      value={formData.productStock}
                    />
                  </div>
                </div>
  
  
              
             
               
  
  
  
           
               <div className="flex">
                 <button
                  type="submit"
                  className = {`${editProduct ?  "bg-blue-700 hover:bg-blue-600 block w-[50%]" : "bg-violet-700 hover:bg-violet-600 w-full" }  cursor-pointer block text-sm/6 font-medium  text-white py-2 px-3 rounded-lg mr-2 `}>
                  {addProduct && "Ajouter Produit"}
                  {editProduct &&  "Modifier Produit"}  
                </button>
  
  
   
                {editProduct && 
                 <button
                  type="submit"
                  className = " block w-[50%] bg-red-700 hover:bg-red-600 cursor-pointer block text-sm/6 font-medium  text-white py-2 px-3 rounded-lg mr-2"
                  onClick={handleCancelData}
                  >
                   Annuler
                </button>
                }
  
               </div>
               
                  
              
  
  
  
  
  
  
  
              </div>
            </form>
  
            
    </div>
    </div>
  
      )}
  
  
  
  
  
  
  
  
      {/* Tableau  */}
  
           <div className="bg-white m-5 p-4  rounded-lg ">
            <table className="w-full border border-violet-100" >
              <thead>
                <tr className="bg-violet-100">
                  <th className="px-4 py-3 font-bold text-sm/6  text-center">S. No</th>
                  <th   className="px-4 py-3 font-bold text-sm/6  text-center">Nom </th>
                  <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Catégorie</th> 
                   <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Fournisseur</th> 
                    <th  className="px-4 py-3 font-bold text-sm/6  text-center" text-center >Prix</th> 
                     <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Stock</th> 
                  <th   className="px-4 py-3 font-bold text-sm/6  text-center">Action</th>
                </tr>
              </thead>
              <tbody>
  
               
               
  
                {filtredProducts && filtredProducts.map((product , index)=> (
                  <tr key={index}>
                  <td   className="px-4 py-3 font-bold text-sm/6 text-center">{index + 1}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{product.productName}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{product.productCategoryId.categoryName}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{product.productSupplierId.supplierName}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{product.productPrice}</td>

            
                  <td   className="px-4 py-3 text-sm/6  text-center">

                  { product.productStock === 0  ? 
                  ( <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> ) :
                  product.productStock < 5 ? ( <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> ) : ( <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> )
                  
                  }

                 
                  
                  
                  
                  </td>


                  <td   className="px-4 py-3 text-sm/6 flex flex-row   justify-center items-center">
                     <button
                  className="cursor-pointer block text-sm/6 font-medium bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-lg mr-2"
                  onClick={() => handleEditProduct(product) }
                >
                  Modifier
                </button>
  
                 <button
                  className="cursor-pointer block text-sm/6 font-medium bg-pink-700 hover:bg-pink-600 text-white py-2 px-3 rounded-lg "
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Supprimer
                </button>
  
                  </td>
                </tr>
  
  
                ))}
  
              </tbody>
            </table>

            {filtredProducts.length === 0 && <p className="text-center mt-3 text-base text-black">Aucun produit trouvé</p>}
          </div>
      
      
      </>
  )
}
