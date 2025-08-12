import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"

export const AdminDashboard = () => {
  return (
    <>

    <div className="flex bg-slate-950 text-white min-h-screen">
    <Sidebar/>
    <div className="flex-1 bg-gray-100 text-stone-950">
      <Outlet/>
    </div>
    </div>
   
    
    </>
  )
}
