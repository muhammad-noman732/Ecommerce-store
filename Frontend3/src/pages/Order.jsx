import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { FiPackage, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi'

function Order() {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      setLoading(true)
      const result = await axios.post(serverUrl + "/api/order/userorder", {}, { withCredentials: true })

      if (result.data) {
        let allOrderItem = []

        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            item['orderId'] = order._id
            allOrderItem.push(item)
          })
        })

        // Reverse so latest orders appear first
        setOrderData(allOrderItem.reverse())
      }
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower.includes('placed') || statusLower.includes('pending')) {
      return <FiPackage className="w-5 h-5" />
    } else if (statusLower.includes('packing')) {
      return <FiPackage className="w-5 h-5" />
    } else if (statusLower.includes('shipped') || statusLower.includes('delivery')) {
      return <FiTruck className="w-5 h-5" />
    } else if (statusLower.includes('delivered')) {
      return <FiCheckCircle className="w-5 h-5" />
    }
    return <FiClock className="w-5 h-5" />
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower.includes('placed') || statusLower.includes('pending')) {
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    } else if (statusLower.includes('packing')) {
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
    } else if (statusLower.includes('shipped') || statusLower.includes('delivery')) {
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    } else if (statusLower.includes('delivered')) {
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    }
    return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (orderData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <FiPackage className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">No Orders Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <button
                onClick={() => window.location.href = '/product'}
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">{orderData.length} {orderData.length === 1 ? 'order' : 'orders'} total</p>
        </div>

        <div className="space-y-6">
          {orderData.map((item, index) => {
            // Support both old (name/image1) and new (title/images) schema
            const displayName = item.title || item.name || `${item.brand || ''} ${item.model || ''}`.trim() || 'Vehicle'
            const displayImage = (item.images && item.images.length > 0) 
              ? item.images[0] 
              : item.image1 || 'https://via.placeholder.com/300x200?text=Vehicle'
            const totalPrice = (item.price || 0) * (item.quantity || 1)

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow p-6 animate-fade-in"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={displayImage}
                      alt={displayName}
                      className="w-full md:w-40 h-40 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Vehicle';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {displayName}
                      </h3>
                      
                      {/* Vehicle Details */}
                      {(item.brand || item.model || item.year) && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {item.brand && item.model ? `${item.brand} ${item.model}` : item.brand || item.model}
                          {item.year && ` • ${item.year}`}
                        </p>
                      )}

                      {/* Order Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">Quantity:</span>
                          <span>{item.quantity || 1}</span>
                        </div>
                        {item.size && item.size !== 'default' && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Size:</span>
                            <span>{item.size}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">Unit Price:</span>
                          <span>{currency}{item.price?.toLocaleString() || '0'}</span>
                        </div>
                      </div>

                      {/* Date and Payment */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <FiClock className="w-4 h-4" />
                          <span>{formatDate(item.date)} at {formatTime(item.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">Payment Method:</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {item.paymentMethod || 'COD'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Status and Total */}
                    <div className="flex flex-col items-start md:items-end gap-4">
                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="font-semibold text-sm">{item.status || 'Pending'}</span>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {currency}{totalPrice.toLocaleString()}
                        </p>
                      </div>

                      {/* Payment Status */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payment Status</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.payment
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                        }`}>
                          {item.payment ? '✅ Paid' : '⏳ Pending'}
                        </span>
                      </div>

                      {/* Track Order Button */}
                      <button
                        onClick={loadOrderData}
                        className="mt-2 px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        Refresh Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Order
