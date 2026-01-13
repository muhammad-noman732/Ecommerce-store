import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { FiUser, FiMail, FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi'

function Users() {
  const { serverUrl } = useContext(authDataContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const observerTarget = useRef(null)

  // Edit/Delete State
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({ name: '', role: '', phone: '' })
  const [actionLoading, setActionLoading] = useState(false)

  const openEditModal = (user) => {
    setSelectedUser(user)
    setEditFormData({
      name: user.name || '',
      role: user.role || 'USER',
      phone: user.phone || ''
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

    try {
      setActionLoading(true)
      const res = await axios.delete(`${serverUrl}/api/user/delete/${userId}`, { withCredentials: true })
      if (res.status === 200) {
        setUsers(prev => prev.filter(u => u._id !== userId))
        setTotal(prev => prev - 1)
        alert("User deleted successfully")
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user")
    } finally {
      setActionLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setActionLoading(true)
      const res = await axios.put(`${serverUrl}/api/user/update/${selectedUser._id}`, editFormData, { withCredentials: true })
      if (res.status === 200) {
        setUsers(prev => prev.map(u => u._id === selectedUser._id ? { ...u, ...editFormData } : u))
        setIsEditModalOpen(false)
        alert("User updated successfully")
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update user")
    } finally {
      setActionLoading(false)
    }
  }

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


    } catch (error) {

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
      <Nav />
      <Sidebar />
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
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            }`}>
                            {user.role || 'USER'}
                          </span>
                          {user.emailVerified !== undefined && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.emailVerified
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              }`}>
                              {user.emailVerified ? '✓ Verified' : '⚠ Unverified'}
                            </span>
                          )}
                        </div>

                        {/* User Actions */}
                        <div className='flex gap-2 mt-2'>
                          <button
                            onClick={() => openEditModal(user)}
                            className='p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-blue-200 dark:border-blue-800'
                            title='Edit User'
                          >
                            <FiEdit2 className='w-4 h-4' />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={actionLoading}
                            className='p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-200 dark:border-red-800'
                            title='Delete User'
                          >
                            <FiTrash2 className='w-4 h-4' />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
              <div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in'>
                <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md overflow-hidden animate-zoom-in'>
                  <div className='gradient-primary p-6 text-white'>
                    <h2 className='text-2xl font-bold'>Update User</h2>
                    <p className='text-purple-100 text-sm'>Editing: {selectedUser?.email}</p>
                  </div>

                  <form onSubmit={handleUpdate} className='p-6 space-y-4'>
                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1'>Full Name</label>
                      <input
                        type='text'
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none'
                        required
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1'>Phone</label>
                      <input
                        type='text'
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1'>Role</label>
                      <select
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none'
                      >
                        <option value="USER">User (Customer)</option>
                        <option value="ADMIN">Admin (Employee)</option>
                      </select>
                    </div>

                    <div className='flex gap-3 mt-6'>
                      <button
                        type='button'
                        onClick={() => setIsEditModalOpen(false)}
                        className='flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        disabled={actionLoading}
                        className='flex-1 px-4 py-2 rounded-lg gradient-primary text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50'
                      >
                        {actionLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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

