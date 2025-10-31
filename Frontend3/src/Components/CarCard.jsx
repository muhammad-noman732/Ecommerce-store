import React, { useContext } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

function CarCard({image, images, brand, model, year, price, mileage, fuel, fuelType, transmission, status, condition, id, _id}) {
    const {currency} = useContext(shopDataContext)
    const navigate = useNavigate()

    // Use images array if available, otherwise single image
    const displayImage = (images && images.length > 0) ? images[0] : image
    const displayFuel = fuel || fuelType || 'N/A'
    const displayMileage = mileage ? `${mileage.toLocaleString()} miles` : 'N/A'
    const displayStatus = status || 'Available'
    const displayPrice = price ? `£${price.toLocaleString()}` : 'Price on request'

    return (
        <div className="group overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-[1.02] card-shadow-hover animate-fade-in">
            <div className="relative overflow-hidden">
                <img
                    src={displayImage}
                    alt={`${brand} ${model}`}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle+Image'
                    }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    {status === 'AVAILABLE' && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Available
                        </span>
                    )}
                    {status === 'RESERVED' && (
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Reserved
                        </span>
                    )}
                    {status === 'SOLD' && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            Sold
                        </span>
                    )}
                    {condition && (
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                            {condition}
                        </span>
                    )}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {brand} {model}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{year}</p>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Mileage</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{displayMileage}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Fuel</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{displayFuel}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Transmission</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{transmission || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Price</p>
                        <p className="font-bold text-purple-600 dark:text-purple-400 text-lg">{displayPrice}</p>
                    </div>
                </div>
                <button 
                    className="w-full gradient-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                    onClick={() => navigate(`/productdetail/${id || _id}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export default CarCard

