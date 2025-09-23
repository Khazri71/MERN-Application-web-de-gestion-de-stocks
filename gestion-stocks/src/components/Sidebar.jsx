import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { HiDuplicate } from "react-icons/hi";
import { FaBox } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";

export const Sidebar = () => {


  const menuItems = [
     {name : "Tableau de bord" , icon : <FaHome />   , path:"/admin-dashboard/"   , isParent : true},
     {name : "Produits" , icon : <FaBox />  , path:"/admin-dashboard/products" , isParent : false},
     {name : "Catégories" , icon : <HiDuplicate />  , path:"/admin-dashboard/categories" , isParent : false},
     {name : "Fournisseurs" , icon : <MdLocalShipping />  , path:"/admin-dashboard/suppliers" , isParent : false},
     {name : "Commandes" , icon : <MdShoppingCart />   , path:"/admin-dashboard/orders" , isParent : false},
     {name : "Utilisateurs" , icon : <FaUsers />  , path:"/admin-dashboard/users" , isParent : false},
     {name : "Profile" , icon : <CgProfile />  , path:"/admin-dashboard/profile" , isParent : false},
     {name : "Déconnexion" , icon : <CgLogOut />  , path:"/admin-dashboard/logout" , isParent : false},
  ]



  const menuItemsCustomer = [
     {name : "Produits" , icon : <FaBox />  , path:"/customer-dashboard/" , isParent : true},
      {name : "Commandes" , icon : <MdShoppingCart />   , path:"/customer-dashboard/orders" , isParent : false},
      {name : "Profile" , icon : <CgProfile />  , path:"/customer-dashboard/profile" , isParent : false},
     {name : "Déconnexion" , icon : <CgLogOut />  , path:"/customer-dashboard/logout" , isParent : false},

  ]


  const {user} = useAuthContext();
  const [menuLinks , setMenuLinks] = useState(menuItemsCustomer);
  useEffect(() => {
       if(user && user.userRole === "admin") {
        setMenuLinks(menuItems);
       }
    
  },[])

  return (
    <div className="flex flex-col">
      <div className="h-16 flex flex-col items-center justify-center p-3 text-xl font-bold w-15 md:w-64 mx-auto my-3"> 
       <span className="hidden md:block">Gestion Stocks</span>
       <span className="block md:hidden">WGS</span>
      </div>

      <div>
         <ul className="space-y-4">
         {menuLinks && menuLinks.map( (item) => (
            <li key={item.name} >
              <NavLink to={item.path} 
              className={({isActive}) => (isActive ? "bg-violet-800" : "" ) + " flex items-center px-3 py-2 w-10 md:w-50 mx-auto rounded-md mx-2 hover:bg-violet-800 transition duration-200" } 
              end = {item.isParent}>
              <span className="mr-2 text-xl">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
              </NavLink>
            </li>
         ))}
         </ul>
      </div>
    </div>
  )
}
