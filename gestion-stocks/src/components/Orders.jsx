import { useEffect , useState } from 'react';
import axios from "axios";
import { IoSearch } from "react-icons/io5";

export const Orders = () => {


  


  const [orders , setOrders] = useState([]);
  const [filtredOrders , setFiltredOrders] = useState(orders);
  const [isLoading , setIsLoading] = useState(false)

  const handleGetOrders = async () => {
    try{
      setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/order` , 
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("info-token")}`,
                }
            }
        );

        const data = response.data;
        if( data.success){
            setIsLoading(false)
            setOrders(data.data);
            setFiltredOrders(data.data);
        }else{
            console.error(data.message);
        }
    }catch(error) {
      setIsLoading(false);
          console.error("Erreur de serveur : " , error);
    }
  }

  useEffect(() => {
    handleGetOrders();
  }, []);


  const handleSearchOrdersByName = (e) => {
    setFiltredOrders(
      orders.filter((order) => order.orderProduct.productName.toLowerCase().includes(e.target.value) )
    )
  }



   if(isLoading) return <div>chargement...</div>
  return (
    <>
      <h1 className=" text-2xl font-bold my-5 ml-5">
          Commandes 
        </h1>



        
          <div className="ml-5 bg-white w-2/6 px-2 py-1 rounded-lg border border-gray-300 flex items-center ">
       <input type="text"  placeholder="Chercher commande par nom produit ..."   className="focus:outline-none w-full " 
        onChange={handleSearchOrdersByName} 
       />  <IoSearch />
     </div>

     <div className="bg-white m-5 p-4  rounded-lg ">
            <table className="w-full border border-violet-100" >
              <thead>
                <tr className="bg-violet-100">
                  <th className="px-4 py-3 font-bold text-sm/6  text-center">S. No</th>
                  <th   className="px-4 py-3 font-bold text-sm/6  text-center">Nom Produit</th>
                  <th  className="px-4 py-3 font-bold text-sm/6  text-center " >Catégorie</th> 
                   <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Quantité Commandée</th>
                    <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Total Prix</th> 
                     <th  className="px-4 py-3 font-bold text-sm/6  text-center" >Date</th> 
                  {/* <th   className="px-4 py-3 font-bold text-sm/6 ">Action</th> */}
                </tr>
              </thead>
              <tbody>
  
               
               
  
                {filtredOrders && filtredOrders.map((order , index)=> (
                  <tr key={index}>
                  <td   className="px-4 py-3 font-bold text-sm/6  text-center">{index + 1}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{order.orderProduct.productName}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{order.orderProduct.productCategoryId.categoryName}</td>
                  <td   className="px-4 py-3 text-sm/6 text-center">{order.orderQuantity}</td>
                  <td   className="px-4 py-3 text-sm/6  text-center">{order.orderTotal}</td>
                    <td   className="px-4 py-3 text-sm/6  text-center">{new Date(order.orderDate).toLocaleDateString()}</td>

            
                


          
                </tr>
  
  
                ))}
  
              </tbody>
            </table>

            {filtredOrders.length === 0 && <p className="text-center mt-3 text-base text-black">Aucune commande trouvée</p>}
          </div>
      
    
    
    
    </>
  )
}
