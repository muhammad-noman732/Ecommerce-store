import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

function OrderSuccess() {
    const [searchParams] = useSearchParams()
    const [verifying, setVerifying] = useState(true)
    const [verified, setVerified] = useState(false)
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const sessionId = searchParams.get('session_id')

    useEffect(() => {
        verifyPayment()
    }, [])

    const verifyPayment = async () => {
        if (!sessionId) {
            toast.error('Invalid payment session')
            navigate('/cart')
            return
        }

        try {
            // Verify the payment session
            const verifyResponse = await axios.get(
                `${serverUrl}/api/payment/verify-session/${sessionId}`,
                { withCredentials: true }
            )

            if (verifyResponse.data?.success && verifyResponse.data?.paid) {
                // Payment is confirmed, update order status
                await axios.post(
                    `${serverUrl}/api/order/update-payment`,
                    {
                        stripeSessionId: sessionId,
                        paymentStatus: 'completed'
                    },
                    { withCredentials: true }
                )

                setVerified(true)
                setVerifying(false)

                // Redirect to orders page after 3 seconds
                setTimeout(() => {
                    navigate('/order')
                }, 3000)
            } else {
                throw new Error('Payment verification failed')
            }
        } catch (error) {
            console.error('Payment verification error:', error)
            toast.error('Unable to verify payment. Please contact support.')
            setVerifying(false)

            // Still navigate to orders page - webhook might have handled it
            setTimeout(() => {
                navigate('/order')
            }, 3000)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
                    {verifying ? (
                        <>
                            <div className="w-16 h-16 mx-auto mb-6">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                Verifying Payment
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Please wait while we confirm your payment...
                            </p>
                        </>
                    ) : verified ? (
                        <>
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                Payment Successful!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Thank you for your order. Your payment has been confirmed.
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    You will receive an email confirmation shortly.
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Redirecting to your orders...
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaSpinner className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                Processing Order
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                We're processing your order. You'll be redirected shortly.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
