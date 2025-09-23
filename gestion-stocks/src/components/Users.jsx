import axios from "axios";
import { useEffect , useState } from "react";
import { IoSearch } from "react-icons/io5";



export const Users = () => {


  const [users , setUsers] = useState([]);
  // const [isLoading , setIsLoading] = useState(true);

  const [formData , setFormData] = useState({
    userName : "" ,
    userEmail : "",
    userPassword : "",
    userAddress : "",
    userRole : ""
  });



  const [filtredUsers , setFiltredUsers] = useState(users);

  const handleChange = (e) => {
     const {name , value} = e.target;
     setFormData((prevData)=>({
      ...prevData ,
      [name] : value
     }))
  }


  
  const initialUser = () => {
    setFormData({
       userName : "" ,
    userEmail : "",
    userPassword : "",
    userAddress : "",
    userRole : ""
    })
  }


  const handleSubmitUser = async (e) => {
     e.preventDefault();

     try{
      const response = await axios.post("http://localhost:3001/api/user/add" , formData , 
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("info-token")}`,
          }
        }
      );
      const data =  response.data;
      if(data.success){
         console.log(data.message);
         initialUser();
         handleGetUsers();
      }else{
        console.error(data.message);
      }

     }catch(error){
        console.error("Erreur de serveur" , error);
     }
  }




  const handleGetUsers = async () => {
      try{
        const response = await axios.get("http://localhost:3001/api/user" , 
          {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("info-token")}`,
            }
          }
        );

        const data = await response.data;
        if(data.success){
          setUsers(data.data);
          setFiltredUsers(data.data);
        }else{
          console.error(data.message);
        }

      }catch(error){
         console.error("Erreur de serveur" , error);
      }
  }


  useEffect(()=>{
       handleGetUsers();
  },[])




  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    console.log(confirmDelete);
    if(confirmDelete){
         try {
       const response = await axios.delete(`http://localhost:3001/api/user/${id}` , 
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem('info-token')}`,
          }
        }
       );
      
       if(response.data.success){
        console.log(response.data.message);
        handleGetUsers();
       }else{
        console.error(response.data.message);
       }
     }catch(error){
         console.error("Erreur de serveur" , error);
     }
    }
    
  }


  const handleSearchUsersByName = (e) => {
          setFiltredUsers(
            users.filter((user) => user.userName.toLowerCase().includes(e.target.value))
          )
  }



  // if(isLoading) return <div>chargement...</div>

  return (
    <>
      <h1 className="ms-5 text-2xl font-bold my-5">
        Gestion des utilisateurs
      </h1>

       <div className="flex justify-between items-center">
         <div className="ml-5 bg-white w-2/6 px-2 py-1 rounded-lg border border-gray-300 flex items-center ">
       <input type="text"  placeholder="Chercher utilisateurs par nom ..."   className="focus:outline-none w-full " 
        onChange={handleSearchUsersByName}
       /> <IoSearch />
     </div>
     </div>




      <div className=" flex flex-col lg:flex-row">
        <div className="bg-white m-5 p-4  rounded-lg lg:w-1/3">
        <h2 className=" text-lg font-bold mb-3">Ajouter Utilisateur</h2>
          <form onSubmit={handleSubmitUser} className="flex flex-col space-y-4 ">
            <div>


              <div className="mb-4">
                <label
                  htmlFor="nameUti"
                  className="block text-sm/6 font-medium "
                >
                  Nom 
                </label>
                <div className="mt-2">
                  <input
                    id="nameUti"
                    type="text"
                    placeholder="Entrer le nom de l'utilisateur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-black-200"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  
                  
                  />
                </div>
              </div>

               <div className="mb-4">
                <label
                  htmlFor="emailUti"
                  className="block text-sm/6 font-medium "
                >
                  Email 
                </label>
                <div className="mt-2">
                  <input
                    id="emailUti"
                    type="text"
                    placeholder="Entrer l'email de l'utilisateur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-black-200"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                  
                  />
                </div>
              </div>



                  <div className="mb-4">
                <label
                  htmlFor="passwordUti"
                  className="block text-sm/6 font-medium "
                >
                  Mot de passe 
                </label>
                <div className="mt-2">
                  <input
                    id="passwordUti"
                    type="password"
                    placeholder="Entrer le mot de passe de l'utilisateur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-black-200"
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={handleChange}
                  
                  />
                </div>
              </div>



               <div className="mb-4">
                <label
                  htmlFor="adressUti"
                  className="block text-sm/6 font-medium "
                >
                 Adresse 
                </label>
                <div className="mt-2">
                  <input
                    id="adressUti"
                    type="text"
                    placeholder="Entrer l'adresse de l'utilisateur"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-black-200"
                    name="userAddress"
                    value={formData.userAddress}
                    onChange={handleChange}
                 
                 
                 />
                </div>
              </div>




                 <div className="mb-4">
                <label
                  htmlFor="roleUti"
                  className="block text-sm/6 font-medium "
                >
                  Role 
                </label>
                <div className="mt-2">
                  <select
                    id="roleUti"
                    required
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 border border-2 border-black-200"
                    name="userRole"
                    // value={formData.userRole}
                    onChange={handleChange}
                  
                  >
                      <option value=""> Choisir un rôle</option>
                    <option value="admin"> Admin</option>
                    <option value="client"> Client</option>
                  </select>
                </div>
              </div>


            

              <div className="flex ">
              <button
                type="submit"
                className="cursor-pointer block text-sm/6 font-medium bg-violet-700 hover:bg-violet-600 text-white py-2 px-3 rounded-lg mr-2 w-full"
              >
               Ajouter Utilisateur
              </button>
              </div>




            </div>
          </form>
        </div>

        {/* ---------- */}
        <div className="bg-white m-5 p-4 w-full rounded-lg  lg:w-2/3">
          <table className="w-full border border-violet-100" >
            <thead>
              <tr className="bg-violet-100">
                <th className="px-4 py-3 font-bold text-sm/6 text-center">S. No</th>
                <th   className="px-4 py-3 font-bold text-sm/6 text-center">Nom</th>
                <th  className="px-4 py-3 font-bold text-sm/6 text-center" >Email</th>
                 <th  className="px-4 py-3 font-bold text-sm/6 text-center" >Adresse</th>
                 <th  className="px-4 py-3 font-bold text-sm/6 text-center" >Role</th>
                <th   className="px-4 py-3 font-bold text-sm/6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>

              {filtredUsers && filtredUsers.map((user , index) => (

              <tr key={index}>
                <td   className="px-4 py-3 font-bold text-sm/6 text-center">{index + 1}</td>
                <td   className="px-4 py-3 text-sm/6 text-center">{user.userName}</td>
                <td   className="px-4 py-3 text-sm/6 text-center">{user.userEmail}</td>
                <td   className="px-4 py-3 text-sm/6 text-center">{user.userAddress}</td>
                <td   className="px-4 py-3 text-sm/6 text-center">{user.userRole}</td>
                <td   className="px-4 py-3 text-sm/6 flex flex-row justify-center items-center">
                 

               <button
                className="cursor-pointer block text-sm/6 font-medium bg-pink-700 hover:bg-pink-600 text-white py-2 px-3 rounded-lg "
        
              onClick={() => handleDeleteUser(user._id)}
              >
                Supprimer
              </button>

                </td>
              </tr>

              ))}

            
           
             

            
           
            </tbody>
          </table>
           {filtredUsers.length === 0 && <p className="text-center mt-3 text-base text-black-200">Aucun utilisateur trouvé </p>}
        </div>
        {/* ---------- */}
      </div>
    </>
  );
};
