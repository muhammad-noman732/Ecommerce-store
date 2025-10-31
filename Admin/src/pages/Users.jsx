import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi'

function Users() {
  const { serverUrl } = useContext(authDataContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const observerTarget = useRef(null)

  const fetchUsers = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true)
      const result = await axios.get(serverUrl + "/api/user/list", { 
        params: { page: pageNum, limit: 20 },
        withCredentials: true 
      })
      
      const data = result.data?.data || []
      const totalCount = result.data?.total || 0
      
      setTotal(totalCount)
      setHasMore(data.length === 20 && (append ? users.length + data.length : data.length) < totalCount)
      
      if (append) {
        setUsers(prev => [...prev, ...data])
      } else {
        setUsers(data)
      }
      
      console.log("Users loaded:", { page: pageNum, loaded: data.length, total: totalCount })
    } catch (error) {
      console.log("Get Users error ", error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }, [serverUrl, users.length])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchUsers(nextPage, true)
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, loading, page, fetchUsers])

  // Initial load
  useEffect(() => {
    fetchUsers(1, false)
  }, [])

  const formatDate = (date) => {
    if (!date) return 'N/A'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px] pb-[50px]'>
      <Nav/>
      <Sidebar/>
      <div className='md:ml-[260px] ml-[64px] p-6 md:p-10'>
        <div className='animate-fade-in'>
          <div className='flex items-center justify-between mb-2'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100'>All Users</h1>
            {total > 0 && (
              <span className='text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg'>
                Total: {total} users
              </span>
            )}
          </div>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>View and manage all registered users</p>
        </div>
        
        {users && users.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-6 animate-fade-in-up'>
              {users.map((user, index) => (
                <div 
                  key={user._id} 
                  className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 card-shadow-hover transition-all duration-300 hover:scale-[1.01]'
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className='flex items-start gap-6'>
                    {/* User Avatar */}
                    <div className='flex-shrink-0'>
                      <div className='w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-2xl font-bold'>
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className='flex-grow'>
                      <div className='flex items-start justify-between flex-wrap gap-4'>
                        <div>
                          <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                            {user.name || 'No Name'}
                          </h3>
                          <div className='space-y-2'>
                            <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                              <FiMail className='w-4 h-4' />
                              <span className='text-sm'>{user.email}</span>
                            </div>
                            {user.phone && (
                              <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                                <span className='text-sm'>📞 {user.phone}</span>
                              </div>
                            )}
                            {user.createdAt && (
                              <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                                <FiCalendar className='w-4 h-4' />
                                <span className='text-sm'>Joined: {formatDate(user.createdAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Role Badge */}
                        <div className='flex flex-col items-end gap-2'>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'ADMIN'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          }`}>
                            {user.role || 'USER'}
                          </span>
                          {user.emailVerified !== undefined && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.emailVerified
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                            }`}>
                              {user.emailVerified ? '✓ Verified' : '⚠ Unverified'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className='h-10 flex items-center justify-center mt-6'>
              {loading && (
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600'></div>
                  <span>Loading more users...</span>
                </div>
              )}
              {!hasMore && users.length > 0 && (
                <p className='text-gray-500 dark:text-gray-400 text-sm'>No more users to load</p>
              )}
            </div>
          </>
        ) : !loading ? (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center animate-fade-in'>
            <p className='text-lg text-gray-600 dark:text-gray-400'>No users found.</p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>Users will appear here once they register.</p>
          </div>
        ) : (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users

