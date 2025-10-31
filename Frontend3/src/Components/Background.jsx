/*import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.avif"

function Background({heroCount}) {
  
    if(heroCount===0){
      return <img src={back1} className='w-[50%] h-[100%] float-left overflow-auto object-cover ml-[50%]'/>
    }
    else if(heroCount===1){
      return <img src={back2} className='w-[50%] h-[100%] float-left overflow-auto object-cover  ml-[50%]'/>
    }   
    else if(heroCount===2){
      return <img src={back3} className='w-[50%] h-[100%] float-left overflow-auto object-cover  ml-[50%]'/>
    } 
      if(heroCount===3){
      return <img src={back4} className='w-[50%] h-[100%] float-left overflow-auto object-cover  ml-[50%]'/>
    }  
}

export default Background*/

{/*Above code was not beginner friendly. In this heroCount is coming as a prop. Since we want to slide 4 images, which is not a big amount. We put them in an array. And now when heroCount changes from 0 to 3 image also changes. and appears on the screen. For example. when the heroCount in Home.jsx is 0 then image on 0 index is called ,e.g images[0].In thee same way all other images are called. */}

import React from 'react'
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.avif"

const images = [back1, back2, back3, back4];

function Background({ heroCount }) {
  return (
    <img
      src={images[heroCount]}
      className='w-[70%] h-[100%] float-left overflow-auto object-cover ml-[50%] top-0 right-0 z-0'
      alt={`Background ${heroCount}`}
    />
  )
}

export default Background
