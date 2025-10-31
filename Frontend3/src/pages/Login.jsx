import React, { useContext, useState } from 'react'
import Logo from "/vcart logo.png"
import google from '../assets/google.webp'
import { useNavigate } from 'react-router-dom'
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../../utilities/Firebase';


const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function Login() {

    let navigate=useNavigate()
    let [showPassword,setShowPassword]=useState(false)

    let {serverUrl}=useContext(authDataContext)

    let {userData,setUserData,loading,setLoading,getCurrentUser} = useContext(userDataContext)

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
      resolver: zodResolver(loginSchema),
      mode: 'onBlur',
      defaultValues: { email: '', password: '' }
    })
    
    
    const handleLogin = async (values) => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl+"/api/auth/login", values, { withCredentials: true })
        setUserData(result.data)
        await getCurrentUser()
        if ((result.data?.role || (result.data?.data && result.data.data.role)) === 'ADMIN') {
          window.location.href = 'http://localhost:5174/'
        } else {
          navigate('/')
        }
      } catch (error) {
        const apiMessage = error.response?.data?.message || 'Login failed'
        setError('root', { type: 'manual', message: apiMessage })
      } finally {
        setLoading(false)
      }
    }

    // const googleLogin=async()=>{
    //     try{

    //         const response= await  signInWithPopup(auth,provider)

    //         let user=response.user

    //         let name=user.displayName

    //         let email=user.email

    //  let result=await axios.post(serverUrl+"/api/auth/googlelogin",{
    //     name,email
    //  },{withCredentials:true})
        
    // console.log("Logged in with Google successfully.",result.data)

    // getCurrentUser()
    
    // navigate("/")

    //     }catch(error){
    //        console.log("Google Login error ❌", error.response?.data || error.message)
    //        setLoading(false)    
    //     }
    // }    

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#0b1220] via-[#0e1a2b] to-[#0b1220] text-white flex flex-col items-center justify-start pb-[20px] overflow-hidden relative'>

  
    {/*Logo and name at the top of registeration page */}    
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>

     <img src={Logo} className='w-[40px] pt-2'/>
     
     <h1 className='text-[22px] font-semibold tracking-wide'>OneCart</h1>

    </div>

    <div className='w-[100%] flex flex-col items-center justify-center absolute top-[58px]'>
 {/*name and description at the top of registeration page */}  
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[6px]'>
       
       <span className='text-[28px] font-semibold'>Welcome back</span>
       <span className='text-[14px] text-[#bcd]'>Sign in to continue to your account</span>

    </div>

{/*Form div */}
    <div className='max-w-[520px] w-[92%] bg-[#0e1626]/60 border border-[#2b3b5a] backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-center p-6'>
    {/*backdrop-blur-2xl= It applies a heavy blur effect to the background behind the element,*/}


      <form action="" className='w-[100%] flex flex-col items-center justify-start gap-[14px]' onSubmit={handleSubmit(handleLogin)}>
{/* 
      
        <div className='w-[90%] h-[50px] bg-[#42656cae]  rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>

            <img src={google} className='w-[20px]'/> Login with Google

        </div> */}

     <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>

       <div className='w-[40%] h-[20px] bg-[#96969635]'></div>

       OR

      <div className='w-[40%] h-[20px] bg-[#96969635]'></div>
        
        
        </div>


      <div className='w-[100%] flex flex-col items-center justify-center gap-[12px] '>


       <input type='email' className='w-[100%] h-[50px] border border-[#2b3b5a] focus:border-[#5f8cff] outline-none backdrop-blur-xl rounded-lg shadow-lg bg-transparent placeholder-[#cfe] px-[16px] font-medium transition-colors' placeholder='Email'
       {...register('email')}
       />
       {errors.email && <span className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.email.message}</span>}

       {/*password */}

       <div className='w-[100%] flex items-center justify-center relative'>

       <input type={showPassword?"text":"password"}
       className='w-[100%] h-[50px] border border-[#2b3b5a] focus:border-[#5f8cff] outline-none backdrop-blur-xl rounded-lg shadow-lg bg-transparent placeholder-[#cfe] px-[16px] font-medium' placeholder='Password'
       {...register('password')}
      /> 
       <span className='flex items-center justify-center text-[20px] absolute right-[12px]' onClick={()=>setShowPassword(prev=>!prev)}>
         {showPassword?<TbEyeClosed/>: <BsEye/>}
         </span>

       </div>
       {errors.password && <span className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.password.message}</span>}
       {errors.root && <div className='w-full text-left text-[12px] text-[#ff8b8b]'>{errors.root.message}</div>}

      <button type='submit' className='w-[100%] h-[50px] bg-[#5f6df7] hover:bg-[#4e5be6] rounded-lg flex items-center justify-center mt-[6px] text-[16px] font-semibold disabled:opacity-70 transition-colors'
       disabled={loading || isSubmitting} >{(loading || isSubmitting) ? "Loading":"Login"}</button>


  <p className='flex gap-[8px] text-[14px] text-[#cfe]'>Don't have an account? <span className='text-[#7aa2ff] hover:text-[#9bb7ff] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>
    Register
    </span>
  </p>            

        </div>  



     </form>


    </div>

    </div>
        
        </div>
  )
}

export default Login