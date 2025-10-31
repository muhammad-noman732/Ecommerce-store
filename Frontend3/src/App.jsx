import React, { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registeration from './pages/Registeration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './Components/Nav'
import { userDataContext } from './Context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetailts from './pages/ProductDetailts'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NotFound'
import AI from './Components/AI'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  let {userData}=useContext(userDataContext)

  let location=useLocation()

  // Note: No global redirect here to avoid loops. Admin redirect handled post-login.

  return (
    <div>
      {userData && <Nav/>}

         <ToastContainer />

      <Routes>


      <Route path='/signup' element={userData ? 
        (<Navigate  to={location.state?.from || "/" } />) 
        :(<Registeration/>)} />

     
       <Route path='/login' element={userData ? 
        (<Navigate  to={location.state?.from || "/" } />) 
        :(<Login/>)}/>   
   
   
     <Route path='/' element={userData ? <Home/> : <Navigate  to='/login' state={{from:location.pathname}}/>} />   



        
       
       
     <Route path='/about' element={userData ? <About/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />

     
     <Route path='/collection' element={userData ? <Collections/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />

     
     <Route path='/product' element={userData ? <Product/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       /> 

     
     <Route path='/contact' element={userData ? <Contact/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />  

     <Route path='/productdetail/:productId' element={userData ? <ProductDetailts/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />        

     <Route path='/cart' element={userData ? <Cart/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />

     <Route path='/placeorder' element={userData ? <PlaceOrder/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       /> 


     <Route path='/order' element={userData ? <Order/> : <Navigate  to='/login' state={{from:location.pathname}}/>}
       />              


      <Route path='*' element={<NotFound/>}/>


     

      </Routes>
      <AI/>
    </div>
  )
}

export default App