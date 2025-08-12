import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router";
export const Root = () => {

  const {user} = useAuthContext()
  const navigate = useNavigate()


  useEffect( () => {
    if(user) {
        if(user.role === "admin"){
             navigate("/admin-dashboard/")
        }else if (user.role === "customer"){
            navigate("/customer-dashboard/")
        }
    }else{
        navigate("/login")
    }
  },[user , navigate])

  return (
    <>
    
    </>
  )
}
