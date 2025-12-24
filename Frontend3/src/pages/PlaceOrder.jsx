import React, { useContext, useState } from 'react'
import CartTotal from '../Components/CartTotal'
import { shopDataContext } from '../Context/ShopContext'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCreditCard } from 'react-icons/fa'

function PlaceOrder() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { serverUrl } = useContext(authDataContext)
  const { cartItem, getCartAmount, products, setCartItem } = useContext(shopDataContext)
  const { userData } = useContext(userDataContext)

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

    if (!userData) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

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
        amount: getCartAmount() // No delivery fee  
      }

      // Stripe Checkout - create session and redirect
      const checkoutData = {
        items: orderItems,
        amount: orderData.amount,
        address: formData
      }

      const stripeResponse = await axios.post(
        serverUrl + "/api/payment/create-checkout-session",
        checkoutData,
        { withCredentials: true }
      )

      if (stripeResponse.data?.success && stripeResponse.data?.url) {
        // Save pending order before redirect
        const pendingOrderData = {
          ...orderData,
          paymentMethod: 'Stripe',
          stripeSessionId: stripeResponse.data.sessionId
        }

        await axios.post(serverUrl + "/api/order/placeorder", pendingOrderData, { withCredentials: true })

        // Redirect to Stripe Checkout
        window.location.href = stripeResponse.data.url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(error.response?.data?.message || 'Failed to initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-400">Complete your order - Payment via Stripe</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Delivery Information</h2>

              <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      First Name *
                    </label>
                    <input
                      type='text'
                      placeholder='John'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                    Email Address *
                  </label>
                  <input
                    type='email'
                    placeholder='johndoe@example.com'
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                      placeholder='London'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='city'
                      value={formData.city}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      State/County *
                    </label>
                    <input
                      type='text'
                      placeholder='Greater London'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
                      required
                      onChange={onChangeHandler}
                      name='state'
                      value={formData.state}
                    />
                  </div>
                </div>

                {/* Postcode and Country */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Postcode *
                    </label>
                    <input
                      type='text'
                      placeholder='SW1A 1AA'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                      placeholder='United Kingdom'
                      className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
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
                    placeholder='07851 386 785'
                    className='w-full h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="w-5 h-5" />
                      Proceed to Payment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
              <CartTotal />
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <FaCreditCard className="inline mr-2" />
                  <strong>Secure Payment via Stripe</strong>
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  You will be redirected to Stripe's secure checkout page to enter your card details. We do not store your card information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
