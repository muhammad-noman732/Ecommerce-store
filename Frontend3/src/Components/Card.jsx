import React, { useContext } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name, title, image, images, id, price, brand, model, year}) {

    let {currency} =  useContext(shopDataContext)

    let navigate=useNavigate()

    // Support both old (name/image) and new (title/images) schema
    const displayName = title || name
    const displayImage = (images && images.length > 0) ? images[0] : image

  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[8px] cursor-pointer border-[1px] border-[#80808049]' onClick={()=>navigate(`/productdetail/${id}`)}>

        <img src={displayImage} className='w-[100%] h-[80%] rounded-sm object-cover' alt={displayName} />

        <div className='text-[#c3f6fa] text-[18px] py-[10px] '>{displayName}</div>

        {/* Show vehicle details if available */}
        {(brand || model || year) && (
            <div className='text-[#a0a0a0] text-[12px] pb-[5px]'>
                {brand && model ? `${brand} ${model}` : brand || model}
                {year && ` • ${year}`}
            </div>
        )}

        <div className='text-[#f3fafa] text-[14px]'>{currency} {price}</div>


    </div>
  )
}

export default Card