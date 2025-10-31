import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const result = await axios.get(serverUrl + "/api/order/stats", { withCredentials: true })
      if (result.data) {
        setStats(result.data)
      }
    } catch (error) {
      console.log("Get Stats error ❌", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px]'>
      <Nav/>
      <Sidebar/>
      <div className='md:ml-[260px] ml-[64px] p-6 md:p-10'>
        <div className='animate-fade-in'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
            Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>
            Welcome to the IMK Autos Admin Panel
          </p>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            {/* Total Vehicles Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 card-shadow-hover animate-fade-in-up'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total Vehicles</p>
                  {loading ? (
                    <div className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                  ) : (
                    <h3 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{stats.totalVehicles}</h3>
                  )}
                </div>
                <div className='w-12 h-12 rounded-full gradient-primary flex items-center justify-center'>
                  <span className='text-white text-xl'>🚗</span>
                </div>
              </div>
            </div>
            
            {/* Total Orders Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 card-shadow-hover animate-fade-in-up' style={{ animationDelay: '0.1s' }}>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Orders</p>
                  {loading ? (
                    <div className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                  ) : (
                    <h3 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{stats.totalOrders}</h3>
                  )}
                </div>
                <div className='w-12 h-12 rounded-full gradient-primary flex items-center justify-center'>
                  <span className='text-white text-xl'>📦</span>
                </div>
              </div>
            </div>
            
            {/* Total Users Card */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 card-shadow-hover animate-fade-in-up' style={{ animationDelay: '0.2s' }}>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total Users</p>
                  {loading ? (
                    <div className='h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                  ) : (
                    <h3 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>{stats.totalUsers}</h3>
                  )}
                </div>
                <div className='w-12 h-12 rounded-full gradient-primary flex items-center justify-center'>
                  <span className='text-white text-xl'>👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 card-shadow-hover animate-fade-in-up' style={{ animationDelay: '0.3s' }}>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Total Revenue</p>
                  {loading ? (
                    <div className='h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                  ) : (
                    <h3 className='text-2xl font-bold text-green-600 dark:text-green-400'>£{stats.totalRevenue?.toLocaleString() || '0'}</h3>
                  )}
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>From paid orders</p>
                </div>
                <div className='w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center'>
                  <span className='text-green-600 dark:text-green-400 text-xl'>💰</span>
                </div>
              </div>
            </div>

            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 card-shadow-hover animate-fade-in-up' style={{ animationDelay: '0.4s' }}>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Pending Revenue</p>
                  {loading ? (
                    <div className='h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse'></div>
                  ) : (
                    <h3 className='text-2xl font-bold text-orange-600 dark:text-orange-400'>£{stats.pendingRevenue?.toLocaleString() || '0'}</h3>
                  )}
                  <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>From unpaid orders</p>
                </div>
                <div className='w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center'>
                  <span className='text-orange-600 dark:text-orange-400 text-xl'>⏳</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Welcome Card */}
          <div className='bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white animate-fade-in-up' style={{ animationDelay: '0.5s' }}>
            <h2 className='text-2xl font-bold mb-3'>Welcome Back! 👋</h2>
            <p className='text-white/90 mb-4'>
              Manage your vehicle inventory, track orders, and grow your business with IMK Autos.
            </p>
            <div className='flex flex-wrap gap-3 mt-6'>
              <button 
                onClick={() => navigate('/add')}
                className='bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
              >
                Add New Vehicle
              </button>
              <button 
                onClick={() => navigate('/lists')}
                className='bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30'
              >
                View All Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
