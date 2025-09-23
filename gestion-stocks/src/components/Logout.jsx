import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext"
import { useEffect } from "react";


export const Logout = () => {

 const navigate = useNavigate();
 const {logoutLr} = useAuthContext();

useEffect(() => {
  logoutLr();
 navigate("/login");
},[logoutLr , navigate])


}
 