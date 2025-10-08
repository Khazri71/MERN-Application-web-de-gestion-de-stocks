import axios from 'axios';
import  { useEffect, useState } from 'react'
import { IoClose , IoSearch } from 'react-icons/io5';
import { useNavigate } from "react-router"

export const ProductsCustomer = () => {

      const [categories , setCategories] = useState([]);
     const [products , setProducts] = useState([]);
     const [filtredProducts , setFiltredProducts] = useState(products)
     const [openModal , setOpenModal] = useState(false);
     const [quantity , setQuantity ] = useState(1);
     const [orderData , setOrderData] = useState({
        productId : "",
        price :0,
        quantity : 1,
        total : 0,
        stock : 0
     })

       const [isLoading , setIsLoading] = useState(false);

         const navigate = useNavigate()
  

const handleGetProducts = async () => {
   try{
    setIsLoading(true)
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
      
        const availableProducts = data.products.filter((product) => product.productStock > 0);
        setProducts(availableProducts);
        setFiltredProducts(availableProducts);
        setCategories(data.categories);
        
      }else{
        setIsLoading(false);
        console.error(response.data.message);
      }
   }catch(error){
    console.error("Erreur de serveur :" , error);
   }
}

useEffect (() => {
 handleGetProducts();
}, [])


const handleSearchProductsByName = (e) => {
   setFiltredProducts(products.filter((product)=> product.productName.toLowerCase().includes(e.target.value.toLowerCase()) ));
}



const handleSearchProductsByCategory = (e) => {
setFiltredProducts(products.filter((product) => 
   product.productCategoryId._id  === e.target.value

));
}



const handleOrderProduct = (product) => {
    console.log(product)
    setOrderData({
        productId : product._id,
        price : product.productPrice,
        quantity : 1,
        total : product.productPrice,
        stock : product.productStock
    });

    setOpenModal(true);

}


const handleCloseModal = () => {
    setOpenModal(false);
}


const handleCancelOrderProduct = () =>  {
    setOrderData((prev)=>({
      ...prev,
      quantity: 1 ,
      total: orderData.price,
   }));
}

const handleInitialOrderProduct = () => {
  setOrderData({
     productId : "",
        price :0,
        quantity : 1,
        total : 0,
        stock : 0
  })
}

const increaseQuantity = (e) => {

   if(e.target.value > orderData.stock){
    alert("Stock insuffisant pour cette commande !");
   }else{
        setOrderData((prev)=>({
      ...prev,
      quantity: parseInt(e.target.value) ,
      total: parseInt(e.target.value) * parseInt(orderData.price),
   }));

   console.log(orderData)
   }

}


const handleSubmitOrder = async (e) => {
  e.preventDefault();
   try{
  
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/order/add` , orderData , 
      {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("info-token")}`,
        }
      }
    );

    const data = response.data;
    if(data.success){
      alert(data.message)
      setOpenModal(false);
      handleInitialOrderProduct();
      navigate("/customer-dashboard/orders")

    }else{
      alert(data.message)
    }

   }catch(error){
      console.error("Erreur de serveur : " , error);
   }
}


 if(isLoading) return <div>chargement...</div>
  return (
   <>

   {openModal && (
    //Modal 
    
   <div className="flex justify-center items-center fixed  h-full w-full top-0 left-0  bg-black/40 ">
    <div className="w-1/3 bg-white p-5 rounded-lg relative" >
    <h2 className=" text-lg font-bold mb-3"> Passer commande </h2>
    <button className="cursor-pointer absolute top-5 right-5" onClick={handleCloseModal}><IoClose size={20} /></button>
           
    <form className="flex flex-col"
     onSubmit={handleSubmitOrder}
     > 
       <label htmlFor="qte">Quantité</label>
       <input type="number" placeholder="Entrer la quantité" id="qte" className="my-2 border px-2 py-1 rounded" min="1"
        value={orderData.quantity}
        onChange={increaseQuantity}

        
        />  
    
        <p className="font-semibold">Total : {orderData.total}</p>
        <div className="flex justify-between items-center mt-4">
              <button
            className="w-1/2 m-1 cursor-pointer block text-sm/6 font-medium bg-green-700 hover:bg-green-600 text-white py-2 px-3 rounded-lg "
        
            >
            Commander
            </button>
            <button
            className="w-1/2 m-1 cursor-pointer block text-sm/6 font-medium bg-red-700 hover:bg-red-600 text-white py-2 px-3 rounded-lg "
               onClick={handleCancelOrderProduct}
            >
            Annuler
            </button>
        </div>
        </form>
    </div>
    
    </div>
    
   ) }




   
   <h1 className=" text-2xl font-bold my-5 ml-5">
          Produits
   </h1>

   <div className="flex justify-between items-center">
     <div className="ml-5 bg-white w-2/6 px-2 py-1  rounded-lg border border-gray-300 " >
      <select name="categories" className="focus:outline-none w-full " 
       onChange={handleSearchProductsByCategory}
      >
        <option value="">Choisir catégorie</option>
        {categories && categories.map((category , index)=> (
                <option key={index} value={category._id}>{category.categoryName}</option>
        ))}

      </select>
     </div>


     <div className="mr-5 bg-white w-2/6 px-2 py-1 rounded-lg border border-gray-300 flex items-center">
       <input type="text"  placeholder="Chercher produits par nom ..."   className="focus:outline-none w-full " 
        onChange={handleSearchProductsByName}
       /> <IoSearch />
     </div>


   </div>





           <div className="bg-white m-5 p-4  rounded-lg ">
            <table className="w-full border border-violet-100" >
              <thead>
                <tr className="bg-violet-100">
                  <th className="px-4 py-3 font-bold text-sm/6  text-center">S. No</th>
                  <th   className="px-4 py-3 font-bold text-sm/6  text-center">Nom </th>
                  <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Catégorie</th> 
                    <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Prix</th> 
                     <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Stock</th> 
                  <th   className="px-4 py-3 font-bold text-sm/6  text-center">Action</th>
                </tr>
              </thead>
              <tbody>
  
               
               
  
                {filtredProducts && filtredProducts.map((product , index)=> (
                  <tr key={index}>
                  <td   className="px-4 py-3 font-bold text-sm/6 text-center">{index + 1}</td>
                  <td   className="px-4 py-3 text-sm/6 text-center">{product.productName}</td>
                  <td   className="px-4 py-3 text-sm/6 text-center">{product.productCategoryId.categoryName}</td>
                  <td   className="px-4 py-3 text-sm/6 text-center">{product.productPrice}</td>

            
                  <td   className="px-4 py-3 text-sm/6  text-center">

                  { product.productStock === 0  ? 
                  ( <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> ) :
                  product.productStock < 5 ? ( <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> ) : ( <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-full font-semibold"  >{product.productStock}</span> )
                  
                  }

                 
                  
                  
                  
                  </td>


                  <td   className="px-4 py-3 text-sm/6 flex flex-row mx-auto justify-center items-center">
                   
  
                 <button
                  className="cursor-pointer block text-sm/6 font-medium bg-green-700 hover:bg-green-600 text-white py-2 px-3 rounded-lg "
                  onClick={() => handleOrderProduct(product)}
                >
                  Commander
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
