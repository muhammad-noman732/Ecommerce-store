import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { FiPhone } from 'react-icons/fi'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      setOrders(result.data.reverse())
    } catch (error) {
      console.log("Load order data error ❌", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log("Status Update error ❌", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const formatDate = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const getProductName = (item) => {
    return item.title || item.name || `${item.brand || ''} ${item.model || ''}`.trim() || 'Vehicle'
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px] pb-[50px]'>
      <Nav />
      <Sidebar />
      <div className='md:ml-[260px] ml-[64px] p-6 md:p-10'>
        <div className='animate-fade-in'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2'>All Orders</h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>Manage and track customer orders</p>
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className='space-y-6 animate-fade-in-up'>
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6 hover:shadow-xl transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Product Icon */}
                <div className='w-16 h-16 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-md'>
                  <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                  </svg>
                </div>

                {/* Customer & Product Info */}
                <div className='flex-grow min-w-0'>
                  {/* Product Badges */}
                  <div className='flex flex-wrap items-start gap-2 mb-4'>
                    {order.items && order.items.map((item, idx) => (
                      <span
                        key={idx}
                        className='px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold'
                      >
                        {getProductName(item).toUpperCase()} × {item.quantity || 1}
                      </span>
                    ))}
                  </div>

                  {/* Customer Information */}
                  <div className='space-y-1 text-sm text-gray-600 dark:text-gray-400'>
                    <p className='font-semibold text-gray-900 dark:text-gray-100 text-base'>
                      {order.address?.firstName || ''} {order.address?.lastName || ''}
                    </p>
                    {order.address?.street && (
                      <p>{order.address.street}{order.address.city ? ',' : ''} {order.address.city || ''}{order.address.state ? ',' : ''} {order.address.state || ''}</p>
                    )}
                    {order.address?.pinCode && (
                      <p>{order.address.city || order.address.state ? '' : ''}{order.address.country || ''}, {order.address.pinCode}</p>
                    )}
                    {!order.address?.pinCode && order.address?.country && (
                      <p>{order.address.country}</p>
                    )}
                    {order.address?.phone && (
                      <p className='flex items-center gap-1 text-red-600 dark:text-red-400'>
                        <FiPhone className='w-4 h-4' />
                        {order.address.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className='flex flex-col lg:items-end gap-3 min-w-[200px]'>
                  <div className='text-sm text-gray-600 dark:text-gray-400 space-y-2'>
                    <div>
                      <span className='font-semibold text-gray-900 dark:text-gray-100'>Items:</span>{' '}
                      <span>{order.items?.length || 0}</span>
                    </div>
                    <div>
                      <span className='font-semibold text-gray-900 dark:text-gray-100'>Method:</span>{' '}
                      <span>{order.paymentMethod || 'COD'}</span>
                    </div>
                    <div>
                      <span className='font-semibold text-gray-900 dark:text-gray-100'>Payment:</span>{' '}
                      <span
                        className={`font-semibold ${
                          order.payment
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-orange-600 dark:text-orange-400'
                        }`}
                      >
                        {order.payment ? '✅ Done' : '⏳ Pending'}
                      </span>
                    </div>
                    <div>
                      <span className='font-semibold text-gray-900 dark:text-gray-100'>Date:</span>{' '}
                      <span>{formatDate(order.date || order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={order.status || 'Order Placed'}
                    className='w-full lg:w-auto px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 text-sm font-medium focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer'
                    onChange={(e) => statusHandler(e, order._id)}
                  >
                    <option value='Order Placed'>Order Placed</option>
                    <option value='Packing'>Packing</option>
                    <option value='Shipped'>Shipped</option>
                    <option value='Out for delivery'>Out for delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>

                  {/* Total Price */}
                  <p className='text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2'>
                    £{order.amount?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center animate-fade-in'>
            <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
              <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <p className='text-lg text-gray-600 dark:text-gray-400'>No orders available.</p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
              Orders will appear here when customers place them.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
