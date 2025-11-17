import React, { useContext } from 'react'
import ai from '../assets/ai.jpg'
import { shopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AI() {

    let {search,setSearch,showSearch,setShowSearch}=useContext(shopDataContext)

    let navigate=useNavigate()




    function speak(message){

        let utterence =  new SpeechSynthesisUtterance(message)

        window.speechSynthesis.speak(utterence)

    }

    const speechRecognition =  window.SpeechRecognition  || window.webkitSpeechRecognition

    const recognition=new speechRecognition()
    
    if(!recognition){
       // Speech recognition not supported
    }

    recognition.onresult=(e)=>{
         const transcript=e.results[0][0].transcript.trim();
        
       if(transcript.toLowerCase().includes('search') && transcript.toLowerCase().includes('open') &&!showSearch){
        speak("opening search")
        setShowSearch(true)
        navigate("/collection")
       }
       else if(transcript.toLowerCase().includes('search') && transcript.toLowerCase().includes('close') &&!showSearch){
        speak("closing search")
        setShowSearch(false)
       } 

     else if(transcript.toLowerCase().includes('collection') || transcript.toLowerCase().includes('collections')  ||transcript.toLowerCase().includes('products')){
        speak("opening collection page")
       navigate("/collection")
       }
 
     else if(transcript.toLowerCase().includes('contact') || transcript.toLowerCase().includes('contactus')  ||transcript.toLowerCase().includes('contactpage')){
        speak("opening contact us page")
       navigate("/contact")
       }       

     else if(transcript.toLowerCase().includes('about') || transcript.toLowerCase().includes('aboutpage')){
        speak("opening about us page")
       navigate("/about")
         setShowSearch(false)      
       } 
 
     else if(transcript.toLowerCase().includes('home') || transcript.toLowerCase().includes('homepage')){
        speak("opening home page")
       navigate("/")
         setShowSearch(false)      
       }

     else if(transcript.toLowerCase().includes('kaat') || transcript.toLowerCase().includes('caat') || transcript.toLowerCase().includes('cart') || transcript.toLowerCase().includes('kart')){
        speak("opening your cart")
       navigate("/cart")
         setShowSearch(false)      
       } 
       
     else if(transcript.toLowerCase().includes('order') || transcript.toLowerCase().includes('my orders')  || transcript.toLowerCase().includes('my order') ){
        speak("opening your orders page")
       navigate("/order")
         setShowSearch(false)      
       }
       else{
        toast.error("try again")
       }       
           
    }

  return (
    <div className='fixed lg-:bottom-[20px] md:bottom-[20px] bottom-[70px] left-[5%] '>

        <img src={ai} className='w-[70px] h-[70px] rounded-full cursor-pointer z-[100]   border-[5px] border-[#163f59] shadow-lg'
         onClick={()=>
         {
        recognition.stop(); // <-- Prevent double start error                
         recognition.start()

         }
         }/>

    </div>
  )
}

export default AI