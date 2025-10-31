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
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-50 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-[black]  '>

        {/* Logo and name*/}
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] ' onClick={()=>navigate("/")}>

        <img src={logo} alt="" className='w-[30px]'/>
        <h1 className='text-[23px] text-[black] font-sans'>OneCart</h1>

      </div>



      <button className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9]  py-[10px] px-[20px] rounded-2xl text-[white]' onClick={logOut}>LogOut</button>

    </div>
  )
}

export default Nav