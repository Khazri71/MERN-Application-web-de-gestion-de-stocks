import { createContext , useState , useContext } from "react";


const AuthContext = createContext()



const AuthContextProvider = ({children}) => {



  const storedUser = () => {
         const storedUserLr = localStorage.getItem("info-user")
         return storedUserLr ? JSON.parse(storedUserLr) : null
  }


  const [user , setUser] = useState(storedUser)


  const loginLr = (userData , token) => {
    setUser(userData)
    localStorage.setItem("info-user" , JSON.stringify(userData))
    localStorage.setItem("info-token" , token)
  }


  const logoutLr = () =>{
    setUser(null)
    localStorage.removeItem("info-user")
    localStorage.removeItem("info-token")
  }


  return (
    <AuthContext.Provider  value={ {user , loginLr , logoutLr}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuthContext = () => useContext(AuthContext)

export default AuthContextProvider