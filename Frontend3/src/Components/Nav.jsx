import React, { useContext, useState } from 'react'
import logo from "/vcart logo.png"
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { userDataContext } from '../Context/UserContext';
import { IoSearchCircle } from "react-icons/io5";
import { Await, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataContext } from '../Context/ShopContext';


function Nav() {

    let {serverUrl}=useContext(authDataContext)
    let {userData,setUserData,getCurrentUser}=useContext(userDataContext)
    let {showSearch,setShowSearch,
      search,setSearch,getCartCount}=useContext(shopDataContext)
    let [showProfile,setShowProfile]=useState(false)

    let navigate=useNavigate()

    const handleLogOut=async()=>{
        try{

         let result=await axios.post(serverUrl+"/api/auth/logout",{}, {withCredentials:true})
         
         console.log("User logged out successfully.",result)

         setUserData("")
         navigate("/login")



        }catch(error){
        console.log(error)            
        }
    }

  return (

   
    <>
  {/* DENSITY BACKGROUND LAYER */}
  <div className='fixed top-0 left-0 w-full h-[70px] bg-[#ecfafaec] z-40'></div>

    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-50 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-[black] '>

  



     {/* Logo and name*/}
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]'>

        <img src={logo} alt="" className='w-[30px]'/>
        <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>

      </div>

      <div className='w-[50%] lg:w-[40%] hidden md:flex'>

     <ul className='flex items-center justify-center gap-[16px] md:gap-[20px] text-[white]'>
       <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9]  py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/")}>HOME</li>

       <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9]  py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/collection")}>COLLECTIONS</li>

       <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9]  py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/about")}>ABOUT</li>

       <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9]  py-[10px] px-[20px] rounded-2xl' onClick={()=>navigate("/contact")}>CONTACT</li>
       </ul>

      </div>

      <div className='w-[30%] flex items-center justify-end gap-[20px]'>

    {showSearch && <IoSearchCircle className='w-[39px] h-[39px] text-[#000000] cursor-pointer transition-all' onClick={()=>setShowSearch(prev=>!prev)}/>}

    {!showSearch &&  <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer transition-all' 
    onClick={()=>
    {setShowSearch(prev=>!prev);
      navigate("/collection")
    }
    }/>
    }    


       {/* logic of showing user circle */}
       {userData==null && <FaUserCircle className='w-[30px] h-[30px] text-[#000000] cursor-pointer'/>}

       {userData!=null && <div className='w-[30px] h-[30px] text-[white] bg-[#080808] text-[26px] rounded-full cursor-pointer flex items-center justify-center' onClick={()=>setShowProfile(prev=>!prev)}> 
        { userData?.name.slice(0,1)}
        </div>}


        <IoMdCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block' onClick={()=>navigate('/cart')} />
        <p className='absolute w-[18px] h-[18px] items-center justify-center bg-[black] px-[5px] py-[2px] text-[white] rounded-full text-[12px] font-semibold top-[8px] right-[23px] hidden md:block'>{getCartCount()}</p>
      </div>

      {showSearch && 
      
     <>      

    {/* DENSITY BACKGROUND LAYER */}
    <div className='absolute top-full left-0 w-full h-[70px] bg-[#d8f6f9dd] z-40'></div>

    
      <div className='w-[100%] h-[70px] bg-[#d8f6f9dd] absolute top-[100%]  left-0 right-0 flex items-center justify-center z-50 border-t-slate-400 border-[1px]'>
        <input type='text' className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-[white] text-[white] text-[18px]'
        placeholder='Search Here' onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      </>}

      {showProfile && 
      <div className='absolute w-[220px] h-[150px] bg-[#000000d7] right-[4%] top-[110%] border-[1px] border-[#aaa9a9] rounded-lg z-100'>
        <ul className='w-[100%] h-[100%] flex items-center justify-around flex-col text-[17px] py-[10px] text-[white]'>
          {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' 
          onClick={(e)=>{
            e.preventDefault();
            navigate('/login')
            setShowProfile(false)

            }}>Login</li>}
           
           {userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
           onClick={()=>{
            handleLogOut();
            setShowProfile(false)
           }}>LogOut</li>}
            
           <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' >Orders</li>
            
           <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'            onClick={()=>{
           navigate("/about")
            setShowProfile(false)
           }}>About</li>
        </ul>

      </div>}

      <div className='w-[100vw] h-[90px] flex items-center text-[15px] justify-between px-[33px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/")}><IoMdHome className='w-[27px] h-[27px] text-[white] md:hidden'/>Home</button>

        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/collections")}><HiOutlineCollection  className='w-[27px] h-[27px]  text-[white] md:hidden'/>Collections</button>


        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate("/contact")}><MdContacts  className='w-[27px] h-[27px]  text-[white] md:hidden'/>Contact</button>


        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={()=>navigate('/cart')}><IoMdCart className='w-[27px] h-[27px] text-[white] md:hidden'/>Cart</button>

        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-[white] px-[5px] py-[2px] text-black rounded-full text-[12px] font-semibold top-[8px] right-[18px] '>{getCartCount()}</p>

      </div>

    </div>
    </>
  )
}

export default Nav