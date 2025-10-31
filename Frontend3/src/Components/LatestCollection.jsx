import React, { useContext, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../Context/ShopContext'
import { useEffect } from 'react'
import Card from './Card'

function LatestCollection() {

    let {products}=useContext(shopDataContext)

    let [latestProducts,setLatestProducts]=useState([])

useEffect(() => {
  if (Array.isArray(products)) {
    // Show latest vehicles (sorted by createdAt, newest first)
    // Filter only available vehicles
    const availableVehicles = products
      .filter(item => item.status === 'AVAILABLE' || !item.status)
      .slice(0, 8)
    setLatestProducts(availableVehicles);
  }
}, [products]);

  return (
    <div>
        <div className='h-[8%] w-[100%] text-center md:mt-[50px]  '>

          <Title text1={"LATEST"} text2={"VEHICLES"} />

          <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>Discover Our Latest Collection of Quality Vehicles! 🚗 </p>

        </div>

       <div className='w-[100%] h-[50%] mt-[30px]  flex items-center justify-center flex-wrap gap-[40px] mb-[25px]'>
        {
        latestProducts.length > 0 ? (
          latestProducts.map((item,index)=>
            (
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
          <p className='text-[#c3f6fa] text-[18px] py-[20px]'>No vehicles available at the moment.</p>
        )}
        </div> 
    </div>
  )
}

export default LatestCollection