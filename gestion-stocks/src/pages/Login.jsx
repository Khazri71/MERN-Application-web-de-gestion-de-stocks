import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router"



export const Login = () => {

  const {loginLr} = useAuthContext()
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const [error , setError] = useState()
  const navigate = useNavigate()




  const loginfunc = async (e) => {
    e.preventDefault()

    try{
      const response = await axios.post("http://localhost:3001/api/auth/login" , {email , password})

      if(response.status === 200){
        //Enrgistrer les informations de l'utilisateur connecté dans le localstorage
         await loginLr(response.data.user , response.data.token)
          console.log(response.data)
         if(response.data.user.role === "admin"){
             navigate("/admin-dashboard/")
         }else{
            navigate("/customer-dashboard/")
         }
      }
    }catch(err){
        setError(err.response.data.message)
    }

    
  }


  return (
   <>
   
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="logo"
            src="logoecom.png"
            className="mx-auto h-10 w-15 h-15"
          />
          {/* <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-600">
            Système de gestion des stocks
          </h1> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Se Connecter
          </h2>
        </div>


        {error &&
        <div className="bg-red-200 sm:mx-auto sm:w-full sm:max-w-sm text-red-600 p-4 rounded-md border border-red-600">
          {error}
        </div>
         }

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={loginfunc}
          className="space-y-6" 
          method="post">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Entrer Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Mot de passe
                </label>
               
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Entrer Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                se connecter
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Je n'ai pas de compte{'   '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
             S'inscrire
            </a>
          </p>
        </div>
      </div>

   </>
  )
}
