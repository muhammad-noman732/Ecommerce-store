import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Background from '../Components/Background'
import Hero from '../Components/Hero'
import HeroCars from '../Components/HeroCars'
import AboutCars from '../Components/AboutCars'
import FeaturesCars from '../Components/FeaturesCars'
import Product from './Product'
import OurPolicy from '../Components/OurPolicy'
import NewLetterBox from '../Components/NewLetterBox'
import Footer from '../Components/Footer'

function Home() {

    // let heroData=[
    //     {text1:"30% OFF Limited Offer",text2:"Style That"},

    //     {text1:"Discover the best of Bold Fashion",text2:"Limited Time Only"},
        
    //     {text1:"Explore Our Best Collection",text2:"Shop Now!"},
        
    //     {text1:"Choose your Perfect Fashion Fit",text2:"Now on Sale!"}        

    // ]

    // let [heroCount,setHeroCount]=useState(0)

    // useEffect(()=>{
    //     let interval=setInterval(()=>{
    //      setHeroCount(prevCount=>(prevCount===3 ? 0 : prevCount+1))      
    //     },3000)

    //     return ()=>clearInterval(interval)

    // },[])

  return (
    <div className='overflow-x-hidden relative lg:top-[0px] md:top-[70px] pt-[70px]'>
    <HeroCars />
     <AboutCars />
     <FeaturesCars />
     {/* <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[60vh]  bg-gradient-to-t from-[#141414] to-[#0c2025] relative '>

        <Background heroCount={heroCount}/>
        <Hero
           heroCount={heroCount} 
           setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
        />

          
    </div> */}
         <Product/>
         {/* <OurPolicy/>  */}
         {/* <NewLetterBox/>   */}
         <Footer/>

    </div>
  )
}

export default Home