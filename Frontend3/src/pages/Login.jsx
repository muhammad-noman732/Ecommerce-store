import React, { useContext, useState } from 'react'
import Logo from "/logo.jpeg"
import { useNavigate } from 'react-router-dom'
import { BsEye } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";
import { authDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function Login() {
  let navigate = useNavigate()
  let [showPassword, setShowPassword] = useState(false)

  let { serverUrl } = useContext(authDataContext)
  const adminRedirectUrl = ((import.meta?.env?.VITE_ADMIN_BASE_URL || '').trim() || window.location.origin).replace(/\/+$/, '')
  let { userData, setUserData, loading, setLoading, getCurrentUser } = useContext(userDataContext)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '' }
  })

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", values, { withCredentials: true })
      setUserData(result.data)
      await getCurrentUser()
      if ((result.data?.role || (result.data?.data && result.data.data.role)) === 'ADMIN') {
        window.location.href = `${adminRedirectUrl}/`
      } else {
        navigate('/')
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message || 'Login failed'
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
          <h2 className='text-4xl font-bold text-white mb-2'>Welcome Back</h2>
          <p className='text-gray-300'>Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <div className='bg-white/10 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl p-8'>
          <form className='space-y-6' onSubmit={handleSubmit(handleLogin)}>
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

            {/* Password */}
            <div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder='Password'
                  className='w-full h-12 bg-white/10 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 pr-12 font-medium transition-all'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(prev => !prev)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
                >
                  {showPassword ? <TbEyeClosed className='w-5 h-5' /> : <BsEye className='w-5 h-5' />}
                </button>
              </div>
              {errors.password && (
                <span className='block mt-2 text-sm text-red-400'>{errors.password.message}</span>
              )}
            </div>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={() => navigate("/forgot-password")}
                className='text-sm text-red-400 hover:text-red-300 transition-colors'
              >
                Forgot Password?
              </button>
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
              {loading || isSubmitting ? 'Loading...' : 'Login'}
            </button>

            {/* Register link */}
            <p className='text-center text-gray-300 text-sm'>
              Don't have an account?{' '}
              <button
                type='button'
                onClick={() => navigate("/signup")}
                className='text-red-400 hover:text-red-300 font-semibold transition-colors'
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
