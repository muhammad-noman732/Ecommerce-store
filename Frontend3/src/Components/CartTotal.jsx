import React, { useContext } from 'react'
import { shopDataContext } from '../Context/ShopContext'

function CartTotal() {
  const { currency, getCartAmount } = useContext(shopDataContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {currency}{subtotal.toLocaleString()}.00
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <span className="text-gray-600 dark:text-gray-400">Shipping Fee</span>
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">
            Free
          </span>
        </div>

        <div className="flex justify-between items-center py-4 border-t-2 border-gray-300 dark:border-gray-600 pt-4 mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">Total</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {currency}{total.toLocaleString()}.00
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
