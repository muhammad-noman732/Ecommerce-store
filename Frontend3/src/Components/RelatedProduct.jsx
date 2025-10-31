import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import CarCard from './CarCard'

function RelatedProduct({ brand, currentProductId }) {
  const { products } = useContext(shopDataContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0 && brand) {
      let productsCopy = products.slice()

      // Filter by same brand, exclude current product, and only show available vehicles
      productsCopy = productsCopy.filter((item) => 
        item.brand?.toLowerCase() === brand.toLowerCase() &&
        item._id !== currentProductId &&
        (item.status === 'AVAILABLE' || !item.status)
      )

      // Limit to 4 related vehicles
      setRelated(productsCopy.slice(0, 4))
    } else {
      // If no brand provided, show any available vehicles excluding current
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => 
        item._id !== currentProductId &&
        (item.status === 'AVAILABLE' || !item.status)
      )
      setRelated(productsCopy.slice(0, 4))
    }
  }, [products, brand, currentProductId])

  if (related.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <CarCard
            key={item._id}
            id={item._id}
            _id={item._id}
            title={item.title}
            brand={item.brand}
            model={item.model}
            year={item.year}
            price={item.price}
            mileage={item.mileage}
            fuelType={item.fuelType}
            transmission={item.transmission}
            condition={item.condition}
            status={item.status}
            images={item.images}
            image={item.images?.[0]}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
