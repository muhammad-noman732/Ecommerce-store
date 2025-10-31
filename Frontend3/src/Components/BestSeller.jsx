import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../Context/ShopContext'
import Card from './Card'

function BestSeller() {

    let {products} = useContext(shopDataContext)

    let [featuredVehicles,setFeaturedVehicles] = useState([])

    useEffect(()=>{

      if (Array.isArray(products)) {
        // Show featured/available vehicles (can filter by condition or other criteria)
        // For now, show available vehicles, sorted by price (lower to higher)
        const featured = products
          .filter((item) => item.status === 'AVAILABLE' || !item.status)
          .sort((a, b) => (a.price || 0) - (b.price || 0))
          .slice(0, 8)
        
        setFeaturedVehicles(featured);
      }

    },[products])

  return (
    <div>
        <div className='h-[8%] w-[100%] text-center md:mt-[50px]  '>

            <Title text1={"FEATURED"} text2={"VEHICLES"} />

            <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>Quality Vehicles at Great Prices - Discover Our Featured Collection</p>

        </div>

      <div className=' w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px] '>
     
     {
        featuredVehicles.length > 0 ? (
          featuredVehicles.map((item,index)=>(
            <Card  
              key={item._id || index} 
              title={item.title} 
              name={item.name} 
              images={item.images} 
              image={item.image1} 
              id={item._id} 
              price={item.price}
              brand={item.brand}
              model={item.model}
              year={item.year}
            />
          ))
        ) : (
          <p className='text-[#c3f6fa] text-[18px] py-[20px]'>No featured vehicles available at the moment.</p>
        )
     }

      </div>

    </div>
  )
}

export default BestSeller