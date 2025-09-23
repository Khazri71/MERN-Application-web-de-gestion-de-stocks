
import { useNavigate } from "react-router"
import { useAuthContext } from "../context/AuthContext"
import { useEffect } from "react"
export const ProtectedRoutes = ({children , requireRole}) => {
  





    const {user } =  useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if(!user){
            navigate("/login");
           
        }
        if(requireRole && user && !requireRole.includes(user.userRole)){
            navigate("/unauthorized")
        }


    }, [user , navigate , requireRole])






  return children
}
