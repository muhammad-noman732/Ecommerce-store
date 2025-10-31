import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Login from './pages/Login'
import { adminDataContext } from './Context/AdminContext'

function App() {

  let {adminData} = useContext(adminDataContext)

  return (
<>

   {!adminData ? <Login/>: <>
   
       <Routes>
      

     <Route path="/" element={<Home/>} />

     <Route path="/add" element={<Add/>} />

     <Route path="/lists" element={<Lists/>} />

     <Route path="/orders" element={<Orders/>} />

     <Route path="/users" element={<Users/>} />

     <Route path="/login" element={<Login/>} />                    

    </Routes>
    
   </>}


</>
  )
}

export default App