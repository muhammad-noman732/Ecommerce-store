import React, { useContext, useState } from 'react'
import CartTotal from '../Components/CartTotal'
import { shopDataContext } from '../Context/ShopContext'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'

function PlaceOrder() {
  const [method, setMethod] = useState('COD')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { serverUrl } = useContext(authDataContext)
  const { cartItem, getCartAmount, delivery_fee, products, setCartItem } = useContext(shopDataContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let orderItems = []

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'COD':
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          console.log("Order placed", result.data)
          if (result.data) {
            setCartItem({})
            navigate('/order')
          } else {
            console.log(result.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("placeOrder data error ❌", error.response?.data || error.message)
      alert(error.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your order by filling in the details below</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Delivery Information</h2>

              <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      First Name *
                    </label>
                    <input
                      type='text'
                      placeholder='John'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='firstName'
                      value={formData.firstName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Last Name *
                    </label>
                    <input
                      type='text'
                      placeholder='Doe'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='lastName'
                      value={formData.lastName}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Email *
                  </label>
                  <input
                    type='email'
                    placeholder='john.doe@example.com'
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                    required
                    onChange={onChangeHandler}
                    name='email'
                    value={formData.email}
                  />
                </div>

                {/* Street */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Street Address *
                  </label>
                  <input
                    type='text'
                    placeholder='123 Main Street'
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                    required
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                  />
                </div>

                {/* City and State */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      City *
                    </label>
                    <input
                      type='text'
                      placeholder='New York'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='city'
                      value={formData.city}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      State *
                    </label>
                    <input
                      type='text'
                      placeholder='NY'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='state'
                      value={formData.state}
                    />
                  </div>
                </div>

                {/* Pincode and Country */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Zip Code *
                    </label>
                    <input
                      type='text'
                      placeholder='10001'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='pinCode'
                      value={formData.pinCode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Country *
                    </label>
                    <input
                      type='text'
                      placeholder='United States'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='country'
                      value={formData.country}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type='tel'
                    placeholder='+1 (555) 123-4567'
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                  />
                </div>

                {/* Payment Method */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Payment Method</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type='button'
                      onClick={() => setMethod('COD')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        method === 'COD'
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FaMoneyBillWave className={`w-6 h-6 ${method === 'COD' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`} />
                        <div className="text-left">
                          <p className={`font-semibold ${method === 'COD' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-gray-100'}`}>
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pay when you receive</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed'
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartTotal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
