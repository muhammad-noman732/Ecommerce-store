import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTimesCircle, FaShoppingCart, FaRedo } from 'react-icons/fa'

function OrderCancel() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaTimesCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        Payment Cancelled
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your payment was not completed. Your cart items are still saved.
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Don't worry! You can try again or choose a different payment method.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/placeorder')}
                            className="w-full gradient-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <FaRedo className="w-4 h-4" />
                            Try Again
                        </button>

                        <Link
                            to="/cart"
                            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600"
                        >
                            <FaShoppingCart className="w-4 h-4" />
                            Back to Cart
                        </Link>

                        <Link
                            to="/"
                            className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm mt-4"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderCancel
