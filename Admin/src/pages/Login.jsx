import React, { useContext, useState } from 'react'
import Logo from "/vcart logo.png"

import { useNavigate } from 'react-router-dom'
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { authDataContext } from '../Context/AuthContext';
import { adminDataContext } from '../Context/AdminContext';

const adminLoginSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function Login() {

    let [showPassword,setShowPassword] =useState(false)
     let [loading,setLoading]=useState(false)

     let {serverUrl} = useContext(authDataContext)

     let {adminData,setAdminData,getAdmin}=useContext(adminDataContext)

     let navigate =useNavigate()


  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(adminLoginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' }
  })

  const AdminLogin = async (values) => {
    try {
       let result = await axios.post(serverUrl+"/api/auth/adminlogin", values, { withCredentials:true }) 
       setAdminData(result.data)
       await getAdmin()
       navigate("/")
    } catch (error) {
       setAdminData(null)
       const apiMessage = error.response?.data?.message || 'Admin login failed'
       setError('root', { type: 'manual', message: apiMessage })
    }
  }   

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#0b1220] via-[#0e1a2b] to-[#0b1220] text-white flex flex-col items-center justify-start pb-[20px]  overflow-hidden relative'>

  
    {/*Logo and name at the top of registeration page */}    
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' >

     <img src={Logo} className='w-[40px] pt-2'/>
     
     <h1 className='text-[22px] font-semibold tracking-wide'>OneCart</h1>

    </div>

    <div className='w-[100%] flex flex-col items-center justify-center absolute top-[65px] gap-[24px]'>
 {/*name and description at the top of registeration page */}  
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[8px]  '>
       
       <span className='text-[28px] font-semibold'>Admin dashboard</span>
       <span className='text-[14px] text-[#bcd]'>Sign in to manage products and orders</span>

    </div>

{/*Form div */}
    <div className='max-w-[520px] w-[92%] bg-[#0e1626]/60 border border-[#2b3b5a] backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-center top-[100px] absolute p-6'>
    {/*backdrop-blur-2xl= It applies a heavy blur effect to the background behind the element,*/}


      <form action="" className='w-[100%] flex flex-col items-center justify-start gap-[14px]' onSubmit={handleSubmit(AdminLogin)}>




      <div className='w-[100%] flex flex-col items-center justify-center gap-[12px] '>


      <input type='email' className='w-[100%] h-[50px] border border-[#2b3b5a] focus:border-[#5f8cff] outline-none backdrop-blur-xl rounded-lg shadow-lg bg-transparent  placeholder-[#cfe] px-[16px] font-medium' placeholder='Email'
       {...register('email')}
       />
      {errors.email && <span className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.email.message}</span>}

       {/*password */}

       <div className='w-[100%] flex items-center justify-center relative'>

      <input type={showPassword?"text":"password"}
       className='w-[100%] h-[50px] border border-[#2b3b5a] focus:border-[#5f8cff] outline-none backdrop-blur-xl rounded-lg shadow-lg bg-transparent  placeholder-[#cfe] px-[16px] font-medium' placeholder='Password'
       {...register('password')} /> 
       <span className='flex items-center justify-center text-[20px] absolute right-[12px]' onClick={()=>setShowPassword(prev=>!prev)}>
         {showPassword?<TbEyeClosed/>: <BsEye/>}
         </span>

       </div>
      {errors.password && <span className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.password.message}</span>}
      {errors.root && <div className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.root.message}</div>}

      <button type='submit' className='w-[100%] h-[50px] bg-[#5f6df7] hover:bg-[#4e5be6] rounded-lg flex items-center justify-center mt-[6px] text-[16px] font-semibold disabled:opacity-70 transition-colors'
      disabled={loading || isSubmitting} >{(loading || isSubmitting) ? "Loading":"Login"}</button>


            

        </div>  



     </form>


    </div>

    </div>
        
        </div>
  )
}

export default Login