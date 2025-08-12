import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router'
import { Root } from './utils/Root'
import { Login } from './pages/Login'
import { AdminDashboard } from './pages/AdminDashboard'
import { CustomerDashboard } from './pages/CustomerDashboard'
import { ProtectedRoutes } from './utils/ProtectedRoutes'
import { Unauthorized } from './pages/Unauthorized'
import { AdminSummury } from './components/AdminSummury'
import { Products } from './components/Products'
import { Categories } from './components/Categories'
import { Suppliers } from './components/Suppliers'
import { Orders } from './components/Orders'
import { Users } from './components/Users'
import { Profil } from './components/Profil'

function App() {
  

  return (
    <> 
      <div>
        <Router>
          <Routes>
            <Route  path="/" element={<Root/>}  />
            <Route path="/login" element={<Login/>} />

            <Route path="/admin-dashboard/" element={<ProtectedRoutes requireRole={["admin"]}>  <AdminDashboard/> </ProtectedRoutes>} 
            >
              <Route  index  element={<AdminSummury/>}/>
              <Route  path="products" element={<Products/>}  /> 
              <Route  path="categories" element={<Categories/>}  /> 
              <Route  path="suppliers" element={<Suppliers/>}  /> 
              <Route  path="orders" element={<Orders/>}  /> 
              <Route  path="users" element={<Users/>}  /> 
              <Route  path="profil" element={<Profil/>}  /> 
            </Route>
            
            
            <Route path="/customer-dashboard/"  element={<CustomerDashboard/>} />
            <Route path="/unauthorized"  element={<Unauthorized/>}/>
          </Routes>
        </Router>
      </div>
 
    </>
  )
}

export default App
