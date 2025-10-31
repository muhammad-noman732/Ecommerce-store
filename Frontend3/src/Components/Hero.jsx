import React from 'react'
import { FaCircle } from "react-icons/fa";

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className=' w-[40%] h-[100%] relative '>
    
     <div className=' absolute text-[#88d9ee] text-[18px] md:text-[35px] lg:text-[50px] md:left-[10%] md:top-[40px] lg:top-[100px] left-[10%] top-[7px] z-10'>
     
{/* <p>{heroData.text1}</p>
    <p>{heroData.text2}</p> 

You might question this. Actually heroData is array of 4 objects. And each object contains text1 and text2. Since heroData is passed as a prop

<Hero  
heroData={heroData[heroCount]} 
/>

So when heroCount changes object of that index is passed as a prop to Hero.jsx which prints the text e.g(text1,text2) of object. Like if heroCount===3 then 3rd index of heroData will be passed as a prop heroData[3] to Hero.jsx which will print the text1 and text2 of heroData[3].
         
         */}    
         <p>{heroData.text1}</p>
         <p>{heroData.text2}</p>
        
     </div>

     <div className='absolute md:top-[235px] lg:top-[480px] top-[139px] left-[15%] flex items-center justify-center gap-[10px] z-10'>

     <FaCircle className={`md:w-[14px] lg:w-[14px] w-[11px] ${heroCount===0 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(0)}/>

     <FaCircle className={`md:w-[14px] lg:w-[14px] w-[11px] ${heroCount===1 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(1)}/>

     <FaCircle className={`md:w-[14px] lg:w-[14px] w-[11px] ${heroCount===2 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(2)}/>

     <FaCircle className={`md:w-[14px] lg:w-[14px] w-[11px] ${heroCount===3 ? "fill-orange-400":"fill-white"}`} onClick={()=>setHeroCount(3)}/> 

     </div>
        
        
        </div>
  )
}

export default Hero