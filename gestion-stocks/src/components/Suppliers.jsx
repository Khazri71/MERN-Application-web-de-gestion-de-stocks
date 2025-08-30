import axios from "axios";
import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5";

export const Suppliers = () => {

  const [addEditModal , setAddEditMoadal] =  useState(null);
  const [formData , setFormData] = useState({
    supplierName : "",
    supplierEmail : "",
    supplierPhone : "",
    supplierAddress : ""
  });
  const [suppliers , setSuppliers] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
  const [addSupplier , setAddSupplier] = useState(false)
  const [editSupplier , setEditSupplier] = useState(null)




  const handleChange = (e) => {
     const {name , value} = e.target;
     setFormData((prev) => ({
         ...prev,
         [name] : value
     }));
  }


  const handleSubmitSupplier = async (e) => {
    e.preventDefault();


    //Modifier Fournisseur par id
    if(editSupplier){
      console.log("Fournisseur Id" , editSupplier)
      
      const response = await axios.put(`http://localhost:3001/api/supplier/${editSupplier}`, formData, 
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("info-token")}`
          },
        }
      );
      const data = await response.data.data
      if (response.data.success){
         console.log("Fournisseur modifié avec succès" , data);
         handleGetSuppliers();
         handleCloseModal();
      }else{
        console.error("Erreur de modification de Fournisseur" , response.data.message)
      }

    }else{

    //Ajouter Fournisseur 

    const response = await axios.post("http://localhost:3001/api/supplier/add" , formData ,
     {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("info-token")}`,
      }
     });
     const data = await response.data.data;
     if(response.data.success){
      console.log("Fournisseur ajouté avec succès" , data);
     handleCloseModal()
      handleGetSuppliers()
     
     }else{
      console.error("Erreur d'ajout du fournisseur" , response.data.message);
     }

    }
  }


  const handleGetSuppliers = async () => {
    setIsLoading(true)
    const response = await axios.get("http://localhost:3001/api/supplier/" , 
      {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("info-token")}`,
        }
      }

    );

    const data = await response.data.data;

    if(response.data.success){
      setIsLoading(false)
      setSuppliers(data);
      console.log(data)
    }else{
      setIsLoading(false)
      console.error("Erreur d'affichage des fournisseurs" , response.data.message)
    }
  }


 
   
 useEffect(() => {
     handleGetSuppliers()
  }, [])


  const handleAddSupplier = () => {
    setAddSupplier(true)
    setAddEditMoadal(1)
  }

  const handleEditSupplier = (supplier) => {
    setEditSupplier(supplier._id)

    setFormData({
      supplierName : supplier.supplierName,
      supplierEmail : supplier.supplierEmail,
      supplierPhone : supplier.supplierPhone,
      supplierAddress : supplier.supplierAddress,
    })

    setAddEditMoadal(1)

  }

  const handleCancelData = () => {
    setFormData({
       supplierName : "",
    supplierEmail : "",
    supplierPhone : "",
    supplierAddress : ""
    })
  }

  const handleCloseModal = () => {
    if(addSupplier) setAddSupplier(false)
    if(editSupplier)  setEditSupplier(false)
    setAddEditMoadal(null)
    handleCancelData()
  }


  const handleDeleteSupplier = async (id) => {
    const confirmDelete =  window.confirm("Êtes-vous sûr de vouloir supprimer cet fournisseur ?");
    console.log(confirmDelete)

    if(confirmDelete){
      
      const response = await axios.delete(`http://localhost:3001/api/supplier/${id}`, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("info-token")}`,
      }
    });
    if(response.data.success){
      console.log("Fournisseur ajouté avec succès");
      handleGetSuppliers()
    }else{
      console.eror("Erreur de suppression de fournisseur" , response.data.message)
    }
    }
  }




// if(isLoading) return <div>Chargement...</div>
  return (
    <>
     <h1 className=" text-2xl font-bold my-5 ml-5">
        Gestion des fournisseurs
      </h1>

      <div className="flex justify-between mx-5 my-5">
        <div>rechercher</div>
        <button className="cursor-pointer block text-sm/6 font-medium bg-violet-700 hover:bg-violet-600 text-white py-2 px-3 rounded-lg"  
        onClick={handleAddSupplier}
        > 
          Ajouter Fournisseur
        </button>
      </div>


    {/* Modal  */}
    {addEditModal && (

 <div className="flex justify-center items-center fixed  h-full w-full top-0 left-0  bg-black/40 ">
  <div className="w-1/3 bg-white p-5 rounded-lg relative" >
  <h2 className=" text-lg font-bold mb-3"> 
    {addSupplier && "Ajouter Fournisseur"}
    {editSupplier && "Modifier Fournisseur"}
    
    </h2>
   <button className="cursor-pointer absolute top-5 right-5" onClick={handleCloseModal}><IoClose size={20} /></button>
        <form  onSubmit={handleSubmitSupplier}
        className="flex flex-col space-y-4  ">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="nameFour"
                  className="block text-sm/6 font-medium "
                >
                  Nom Fournisseur
                </label>
                <div className="mt-2">
                  <input
                    id="nameFour"
                    type="text"
                    placeholder="Entrer le nom du fournisseur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-gray-400"
                    onChange={handleChange}
                    name = "supplierName"
                    value={formData.supplierName}
                  />
                </div>
              </div>



               <div className="mb-4">
                <label
                  htmlFor="emailFour"
                  className="block text-sm/6 font-medium "
                >
                  Email Fournisseur
                </label>
                <div className="mt-2">
                  <input
                    id="emailFour"
                    type="text"
                    placeholder="Entrer l'email du fournisseur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-gray-400"
                    onChange={handleChange}
                    name="supplierEmail"
                    value={formData.supplierEmail}
                  />
                </div>
              </div>


               <div className="mb-4">
                <label
                  htmlFor="telFour"
                  className="block text-sm/6 font-medium "
                >
                  Téléphone Fournisseur
                </label>
                <div className="mt-2">
                  <input
                    id="telFour"
                    type="text"
                    placeholder="Entrer le téléphone du fournisseur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-gray-400"
                    onChange={handleChange}
                    name="supplierPhone"
                    value={formData.supplierPhone}
                  />
                </div>
              </div>


               <div className="flex flex-col mb-4">
                <label
                  htmlFor="addFour"
                  className="block text-sm/6 font-medium mb-2"
                >
                  Adresse Fournisseur
                </label>
                <textarea
                  id="addFour"
                  cols="35"
                  rows="4"
                  placeholder="Entrer l'adresse du fournisseur"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-gray-400"
                  onChange={handleChange}
                  name="supplierAddress"
                  value={formData.supplierAddress}

                ></textarea>
              </div>

             
            
           
             



         
             <div className="flex">
               <button
                type="submit"
                className = {`${editSupplier ?  "bg-blue-700 hover:bg-blue-600 block w-[50%]" : "bg-violet-700 hover:bg-violet-600 w-full" }  cursor-pointer block text-sm/6 font-medium  text-white py-2 px-3 rounded-lg mr-2 `}>
                {addSupplier && "Ajouter Fournisseur"}
                {editSupplier &&  "Modifier Fournisseur"}  
              </button>


 
              {editSupplier && 
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
                <th className="px-4 py-3 font-bold text-sm/6 ">S. No</th>
                <th   className="px-4 py-3 font-bold text-sm/6 ">Nom </th>
                <th  className="px-4 py-3 font-bold text-sm/6 " >Email</th> 
                 <th  className="px-4 py-3 font-bold text-sm/6 " >Téléphone</th> 
                  <th  className="px-4 py-3 font-bold text-sm/6 " >Adresse</th> 
                <th   className="px-4 py-3 font-bold text-sm/6 ">Action</th>
              </tr>
            </thead>
            <tbody>

             
             

              {suppliers && suppliers.map((supplier , index)=> (
                <tr key={index}>
                <td   className="px-4 py-3 font-bold text-sm/6">{index + 1}</td>
                <td   className="px-4 py-3 text-sm/6">{supplier.supplierName}</td>
                <td   className="px-4 py-3 text-sm/6">{supplier.supplierEmail}</td>
                <td   className="px-4 py-3 text-sm/6">{supplier.supplierPhone}</td>
                <td   className="px-4 py-3 text-sm/6">{supplier.supplierAddress}</td>
                <td   className="px-4 py-3 text-sm/6 flex flex-row mx-auto">
                   <button
                className="cursor-pointer block text-sm/6 font-medium bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-lg mr-2"
                onClick={() => handleEditSupplier(supplier) }
              >
                Modifier
              </button>

               <button
                className="cursor-pointer block text-sm/6 font-medium bg-pink-700 hover:bg-pink-600 text-white py-2 px-3 rounded-lg "
                onClick={() => handleDeleteSupplier(supplier._id)}
              >
                Supprimer
              </button>

                </td>
              </tr>


              ))}

            </tbody>
          </table>
        </div>
    
    
    </>
  )
}
