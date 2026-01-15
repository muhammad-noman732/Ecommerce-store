import React, { useContext, useState } from 'react'
import Logo from "/logo.jpeg"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const forgotPasswordSchema = z.object({
    email: z.string().trim().email('Enter a valid email'),
})

function ForgotPassword() {
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onBlur',
        defaultValues: { email: '' }
    })

    const handleForgotPassword = async (values) => {
        setLoading(true)
        setSuccessMessage('')
        try {
            await axios.post(serverUrl + "/api/auth/forgot-password", values)
            setSuccessMessage('Password reset email sent! Check your inbox.')
        } catch (error) {
            const apiMessage = error.response?.data?.message || 'Failed to send email'
            setError('root', { type: 'manual', message: apiMessage })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden'>
            {/* Background decoration */}
            <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>

            {/* Logo and name at the top */}
            <div className='absolute top-8 left-8 flex items-center gap-3 z-10 cursor-pointer' onClick={() => navigate("/")}>
                <img src={Logo} className='w-10 h-10' alt="Logo" />
                <h1 className='text-2xl font-bold text-white'>IMK Autos</h1>
            </div>

            <div className='w-full max-w-md relative z-10 animate-fade-in'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-4xl font-bold text-white mb-2'>Forgot Password</h2>
                    <p className='text-gray-300'>Enter your email to receive a reset link</p>
                </div>

                {/* Form */}
                <div className='bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl p-8'>
                    {successMessage ? (
                        <div className="text-center">
                            <p className="text-green-400 mb-6">{successMessage}</p>
                            <button
                                type='button'
                                onClick={() => navigate("/login")}
                                className='w-full h-12 gradient-primary text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:opacity-90'
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <form className='space-y-6' onSubmit={handleSubmit(handleForgotPassword)}>
                            {/* Email */}
                            <div>
                                <input
                                    type='email'
                                    {...register('email')}
                                    placeholder='Email'
                                    className='w-full h-12 bg-white/10 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 font-medium transition-all'
                                />
                                {errors.email && (
                                    <span className='block mt-2 text-sm text-red-400'>{errors.email.message}</span>
                                )}
                            </div>

                            {/* Root error */}
                            {errors.root && (
                                <div className='bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400'>
                                    {errors.root.message}
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type='submit'
                                disabled={loading || isSubmitting}
                                className='w-full h-12 gradient-primary text-white rounded-lg font-semibold disabled:opacity-70 transition-all shadow-lg hover:shadow-xl hover:opacity-90'
                            >
                                {loading || isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            {/* Back to Login */}
                            <p className='text-center text-gray-300 text-sm'>
                                Remember your password?{' '}
                                <button
                                    type='button'
                                    onClick={() => navigate("/login")}
                                    className='text-red-400 hover:text-red-300 font-semibold transition-colors'
                                >
                                    Login
                                </button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
