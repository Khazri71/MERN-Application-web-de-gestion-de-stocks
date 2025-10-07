import axios from 'axios';
import  { useEffect, useState } from 'react'

export const AdminSummury = () => {



  const [dashboardData , setDashboardData] = useState({
    totalProducts : 0,
    totalStock : 0,
    ordersToday : 0 ,
    totalRevenu : 0,
    outOfStock : [],
    highestSaleProduct : {},
    lowStock : []

  });


  const handleGetDashboardData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/dashboard` ,
      {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("info-token")}`,
        }
      });

      const data = response.data ;
      if(data.success){
        setDashboardData(data.data)
      }else{
        console.error(data.message);
      }
    }catch(error) {
      console.error("Erreur de serveur" , error)
    }
  }

  useEffect(() => {
      handleGetDashboardData()
  },[])

  return (
   <>
   
    <h1 className="ms-5 text-2xl font-bold my-5">
        Tableau de bord
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 mx-2">

        <div className="bg-pink-500 text-white  flex flex-col justify-center items-center p-5 rounded-lg">
          <p className="text-lg font-semibold">Produit Total</p>
          <p className="text-2xl font-bold" >{dashboardData.totalProducts}</p>
        </div>


         <div  className="bg-blue-500 text-white  flex flex-col justify-center items-center p-5 rounded-lg">
            <p className="text-lg font-semibold">Stock Total</p>
          <p className="text-2xl font-bold" >{dashboardData.totalStock}</p>
        </div>


         <div  className="bg-violet-400 text-white  flex flex-col justify-center items-center p-5 rounded-lg">
           <p className="text-lg font-semibold">Commandes de jour</p>
          <p className="text-2xl font-bold" >{dashboardData.ordersToday}</p>
        </div>

         <div  className="bg-gray-500 text-white  flex flex-col justify-center items-center p-5 rounded-lg">
           <p className="text-lg font-semibold">Revenu</p>
          <p className="text-2xl font-bold" >{dashboardData.totalRevenu} DT</p>
        </div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6 mx-3 ">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Produits en rupture de stock</p>
            {dashboardData.outOfStock.length > 0 ? (
             <ul>
                {dashboardData.outOfStock.map((product , index) => (
                   <li key={index}>
                      <p className="text-sm font-bold my-1">Nom : <span className="font-normal text-gray-600"> {product.productName } </span> </p>
                      <p className="text-sm font-bold">Catégorie : <span className="font-normal text-gray-600">{product.productCategoryId.categoryName}</span> </p>
                      <br />
                   </li>
                ))}

             </ul>
            ) : (
              <p className=" text-gray-600">Aucun Produit en repture de stock</p>
            )}

          </div>


            <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Produit le plus vendu</p>
            {dashboardData.highestSaleProduct?.name ? (
              <>
               <p className="text-sm font-bold my-1">Nom : <span className="font-normal text-gray-600">{dashboardData.highestSaleProduct.name} </span> </p>
                <p className="text-sm font-bold my-1">Catégorie : <span className="font-normal text-gray-600">{dashboardData.highestSaleProduct.category} </span> </p>
               <p className="text-sm font-bold">Quantité Total : <span className="font-normal text-gray-600">{dashboardData.highestSaleProduct.totalQuantity}</span> </p>
              
              </>

            ) : (<p className=" text-gray-600">{dashboardData.highestSaleProduct?.message || "Chargement..."}</p>) }


            {/* <div>
              <p className=" font-bold my-1">Name : <span className="font-normal text-gray-600">Parfum </span> </p>
               <p className=" font-bold">Category : <span className="font-normal text-gray-600">Channel</span> </p>
            </div> */}
          </div>


           <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">Produits en stock limité</p>
             {dashboardData.lowStock.length > 0 ? (
             <ul>
                {dashboardData.lowStock.map((product , index) => (
                   <li key={index}>
                      <p className="text-sm font-bold my-1">{product.productName} - <span className="font-normal text-gray-700"> {product.productStock} </span> <span className="font-normal text-gray-600">  { "("+ product.productCategoryId.categoryName +")"} </span> </p>
                   </li>
                ))}

             </ul>
            ) : (
              <p className=" text-gray-600">Aucun Produit en stock limité</p>
            )}

          </div>



      </div>



   
   </>
  )
}
