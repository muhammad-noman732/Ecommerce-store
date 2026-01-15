import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { adminDataContext } from './Context/AdminContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let { adminData } = useContext(adminDataContext)

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={!adminData ? <Login /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route path="/" element={adminData ? <Home /> : <Navigate to="/login" />} />
        <Route path="/add" element={adminData ? <Add /> : <Navigate to="/login" />} />
        <Route path="/lists" element={adminData ? <Lists /> : <Navigate to="/login" />} />
        <Route path="/orders" element={adminData ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/users" element={adminData ? <Users /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App