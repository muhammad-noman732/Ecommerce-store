import React, { useContext } from 'react'
import logo from "/vcart logo.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { CgLayoutGrid } from 'react-icons/cg'
import { adminDataContext } from '../Context/AdminContext'

function Nav() {

    let navigate=useNavigate()
    let {serverUrl}=useContext(authDataContext)

    let {adminData,setAdminData}=useContext(adminDataContext)

    const logOut=async()=>{
        try{

            let result=await axios.post(serverUrl+"/api/auth/logout",{}, {withCredentials:true})

            console.log("Admin logged out successfully.")

            setAdminData(null)

            navigate("/login")

        }catch(error){

      console.log("Admin logOut error ❌", error.response?.data || error.message)
    }           

        }
    

  return (
    <nav className='w-full h-[70px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-50 fixed top-0 left-0 right-0 flex items-center justify-between px-6 shadow-sm'>
      {/* Logo and name*/}
      <div className='flex items-center gap-3 cursor-pointer' onClick={()=>navigate("/")}>
        <img src={logo} alt="IMK Autos" className='w-8 h-8'/>
        <h1 className='text-xl font-bold gradient-primary bg-clip-text text-transparent'>
          IMK Autos Admin
        </h1>
      </div>

      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-600 dark:text-gray-400 hidden md:block'>
          {adminData?.email || 'Admin'}
        </span>
        <button 
          className='text-sm hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 py-2 px-4 rounded-lg text-red-600 dark:text-red-400 font-medium transition-colors shadow-sm hover:shadow-md' 
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Nav