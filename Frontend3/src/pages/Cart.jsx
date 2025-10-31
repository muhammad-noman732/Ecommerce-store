import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMinus, FiPlus } from "react-icons/fi";
import CartTotal from '../Components/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item]) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          });
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity < 1) {
      updateQuantity(itemId, size, 0)
    } else {
      updateQuantity(itemId, size, newQuantity)
    }
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Start adding vehicles to your cart to continue</p>
              <button
                onClick={() => navigate('/product')}
                className="gradient-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Browse Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">{cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              const displayImage = (productData.images && productData.images.length > 0) 
                ? productData.images[0] 
                : productData.image1 || 'https://via.placeholder.com/300x200?text=Vehicle';
              const displayName = productData.title || productData.name || `${productData.brand} ${productData.model}`;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 hover:shadow-xl transition-shadow animate-fade-in"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={displayImage}
                        alt={displayName}
                        className="w-full md:w-40 h-40 object-cover rounded-lg cursor-pointer"
                        onClick={() => navigate(`/productdetail/${item._id}`)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Vehicle';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={() => navigate(`/productdetail/${item._id}`)}
                        >
                          {displayName}
                        </h3>
                        {(productData.brand || productData.model || productData.year) && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            {productData.brand && productData.model ? `${productData.brand} ${productData.model}` : productData.brand || productData.model}
                            {productData.year && ` • ${productData.year}`}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                          {currency}{productData.price?.toLocaleString() || '0'}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiMinus className="w-5 h-5" />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <RiDeleteBin6Line className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartTotal />
              <button
                className="w-full gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl mt-6"
                onClick={() => {
                  if (cartData.length > 0) {
                    navigate("/placeorder")
                  }
                }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate('/product')}
                className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-lg px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
