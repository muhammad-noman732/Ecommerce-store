import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import { RxCross2 } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiUpload, FiX } from 'react-icons/fi'

const vehicleSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters'),
  brand: z.string().trim().min(2, 'Brand is required'),
  model: z.string().trim().min(2, 'Model is required'),
  year: z.coerce.number().min(1950).max(new Date().getFullYear() + 1),
  mileage: z.coerce.number().min(0),
  fuelType: z.string().min(1, 'Fuel type is required'),
  transmission: z.string().min(1, 'Transmission is required'),
  engineSize: z.string().optional(),
  bodyType: z.string().optional(),
  color: z.string().optional(),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  location: z.string().default('UK'),
  condition: z.enum(['New','Used']),
  description: z.string().trim().min(10, 'Description must be at least 10 characters'),
  stockNumber: z.string().trim().min(1, 'Stock number is required'),
  status: z.enum(['AVAILABLE','RESERVED','SOLD']).default('AVAILABLE')
})

function Lists() {
  const { serverUrl } = useContext(authDataContext)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [existingImages, setExistingImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [updating, setUpdating] = useState(false)
  const observerTarget = useRef(null)

  const { register, handleSubmit, formState: { errors }, setError, reset, setValue } = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: 'onBlur'
  })

  const fetchList = useCallback(async (pageNum = 1, append = false) => {
    try {
      setLoading(true)
      const result = await axios.get(serverUrl + "/api/product/list", { 
        params: { page: pageNum, limit: 20 },
        withCredentials: true 
      })
      
      const data = result.data?.data || []
      const totalCount = result.data?.total || 0
      
      setTotal(totalCount)
      setHasMore(data.length === 20 && (append ? list.length + data.length : data.length) < totalCount)
      
      if (append) {
        setList(prev => [...prev, ...data])
      } else {
        setList(data)
      }
      
     
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }, [serverUrl, list.length])

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1
          setPage(nextPage)
          fetchList(nextPage, true)
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
  }, [hasMore, loading, page, fetchList])

  // Initial load
  useEffect(() => {
    fetchList(1, false)
  }, [])

  const removeList = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return
    try {
      await axios.delete(serverUrl + `/api/product/remove/${id}`, { withCredentials: true })
      // Reload from page 1
      setPage(1)
      fetchList(1, false)
    } catch (error) {
     
    }
  }

  const openEditModal = (vehicle) => {
    setSelectedVehicle(vehicle)
    setExistingImages(vehicle.images || [vehicle.image1, vehicle.image2, vehicle.image3, vehicle.image4].filter(Boolean))
    setNewImages([])
    
    setValue('title', vehicle.title || vehicle.name || '')
    setValue('brand', vehicle.brand || '')
    setValue('model', vehicle.model || '')
    setValue('year', vehicle.year || '')
    setValue('mileage', vehicle.mileage || '')
    setValue('fuelType', vehicle.fuelType || '')
    setValue('transmission', vehicle.transmission || '')
    setValue('engineSize', vehicle.engineSize || '')
    setValue('bodyType', vehicle.bodyType || '')
    setValue('color', vehicle.color || '')
    setValue('price', vehicle.price || '')
    setValue('location', vehicle.location || 'UK')
    setValue('condition', vehicle.condition || 'Used')
    setValue('description', vehicle.description || '')
    setValue('stockNumber', vehicle.stockNumber || '')
    setValue('status', vehicle.status || 'AVAILABLE')
    
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setSelectedVehicle(null)
    setExistingImages([])
    setNewImages([])
    reset()
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImagesToAdd = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setNewImages(prev => [...prev, ...newImagesToAdd])
  }

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeNewImage = (index) => {
    setNewImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const onSubmit = async (values) => {
    if (existingImages.length === 0 && newImages.length === 0) {
      setError('root', { type: 'manual', message: 'Please keep at least one image or upload a new one' })
      return
    }

    setUpdating(true)
    try {
      const formData = new FormData()
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key])
        }
      })

      newImages.forEach((img, idx) => {
        formData.append(`image${idx + 1}`, img.file)
      })

      const result = await axios.put(
        serverUrl + `/api/product/update/${selectedVehicle._id}`, 
        formData, 
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      if (result.data) {
        closeEditModal()
        setPage(1)
        await fetchList(1, false)
      }
    } catch (error) {
      setError('root', { 
        type: 'manual', 
        message: error.response?.data?.message || 'Failed to update vehicle' 
      })
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px] pb-[50px]'>
      <Nav/>
      <Sidebar/>
      <div className='md:ml-[260px] ml-[64px] p-6 md:p-10'>
        <div className='animate-fade-in'>
          <div className='flex items-center justify-between mb-2'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100'>All Vehicles</h1>
            {total > 0 && (
              <span className='text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg'>
                Total: {total} vehicles
              </span>
            )}
          </div>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>Manage and edit your vehicle inventory</p>
        </div>
        
        {list && list.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-6 animate-fade-in-up'>
              {list.map((item, index) => (
                <div 
                  key={item._id} 
                  className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 card-shadow-hover transition-all duration-300 hover:scale-[1.01]'
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className='flex-shrink-0'>
                    <img 
                      src={item.images?.[0] || item.image1 || '/placeholder.png'} 
                      alt={item.title} 
                      className='w-[200px] h-[140px] object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md'
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle+Image'
                      }}
                    />
                  </div>

                  <div className='flex-grow'>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>{item.title || item.name || 'Untitled'}</h3>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>Brand/Model</p>
                        <p className='font-semibold text-gray-900 dark:text-gray-100'>{item.brand || 'N/A'} {item.model || ''}</p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>Year</p>
                        <p className='font-semibold text-gray-900 dark:text-gray-100'>{item.year || 'N/A'}</p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>Mileage</p>
                        <p className='font-semibold text-gray-900 dark:text-gray-100'>{item.mileage?.toLocaleString() || 'N/A'} miles</p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>Price</p>
                        <p className='font-bold text-purple-600 dark:text-purple-400 text-lg'>£{item.price?.toLocaleString() || 'N/A'}</p>
                      </div>
                    </div>
                    <div className='mt-3 flex gap-2 flex-wrap'>
                      {item.fuelType && <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium'>{item.fuelType}</span>}
                      {item.transmission && <span className='px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium'>{item.transmission}</span>}
                      {item.condition && <span className='px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium'>{item.condition}</span>}
                      {item.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'AVAILABLE' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          item.status === 'RESERVED' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>{item.status}</span>
                      )}
                    </div>
                  </div>

                  <div className='flex gap-3'>
                    <button
                      onClick={() => openEditModal(item)}
                      className='p-3 gradient-primary text-white rounded-lg transition-all hover:shadow-lg hover:scale-105'
                      title='Edit'
                    >
                      <MdModeEditOutline className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() => removeList(item._id)}
                      className='p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-lg hover:scale-105'
                      title='Delete'
                    >
                      <RxCross2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className='h-10 flex items-center justify-center mt-6'>
              {loading && (
                <div className='flex items-center gap-2 text-gray-600 dark:text-gray-400'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600'></div>
                  <span>Loading more vehicles...</span>
                </div>
              )}
              {!hasMore && list.length > 0 && (
                <p className='text-gray-500 dark:text-gray-400 text-sm'>No more vehicles to load</p>
              )}
            </div>
          </>
        ) : !loading ? (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center animate-fade-in'>
            <p className='text-lg text-gray-600 dark:text-gray-400'>No vehicles available.</p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>Add your first vehicle to get started.</p>
          </div>
        ) : (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600'></div>
          </div>
        )}
      </div>

      {/* Edit Modal - Same as before */}
      {showEditModal && selectedVehicle && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8 animate-fade-in-up'>
            <div className='sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Edit Vehicle</h2>
              <button
                onClick={closeEditModal}
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <RxCross2 className='w-6 h-6 text-gray-600 dark:text-gray-400' />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6'>
              {errors.root && (
                <div className='bg-red-50 border-l-4 border-red-500 p-4 text-red-700'>
                  {errors.root.message}
                </div>
              )}

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3'>Vehicle Images</label>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                  {existingImages.map((imgUrl, idx) => (
                    <div key={`existing-${idx}`} className='relative group'>
                      <img 
                        src={imgUrl} 
                        alt={`Existing ${idx + 1}`} 
                        className='w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700' 
                      />
                      <button
                        type='button'
                        onClick={() => removeExistingImage(idx)}
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}

                  {newImages.map((img, idx) => (
                    <div key={`new-${idx}`} className='relative group'>
                      <img 
                        src={img.preview} 
                        alt={`New ${idx + 1}`} 
                        className='w-full h-32 object-cover rounded-lg border-2 border-green-300' 
                      />
                      <button
                        type='button'
                        onClick={() => removeNewImage(idx)}
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  ))}

                  {(existingImages.length + newImages.length) < 10 && (
                    <label className='flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-gray-50 dark:bg-gray-700/50'>
                      <FiUpload size={24} className='text-gray-500 dark:text-gray-400 mb-2' />
                      <span className='text-xs text-gray-600 dark:text-gray-400'>Add Image</span>
                      <input 
                        type='file' 
                        accept='image/*' 
                        multiple 
                        onChange={handleImageChange} 
                        className='hidden' 
                      />
                    </label>  
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Title *</label>
                  <input {...register('title')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.title && <p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Stock Number *</label>
                  <input {...register('stockNumber')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.stockNumber && <p className='text-red-500 text-xs mt-1'>{errors.stockNumber.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Brand *</label>
                  <input {...register('brand')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.brand && <p className='text-red-500 text-xs mt-1'>{errors.brand.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Model *</label>
                  <input {...register('model')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.model && <p className='text-red-500 text-xs mt-1'>{errors.model.message}</p>}
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Year *</label>
                  <input type='number' {...register('year')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.year && <p className='text-red-500 text-xs mt-1'>{errors.year.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Mileage *</label>
                  <input type='number' {...register('mileage')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.mileage && <p className='text-red-500 text-xs mt-1'>{errors.mileage.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Fuel Type *</label>
                  <select {...register('fuelType')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                    <option value=''>Select</option>
                    <option value='Petrol'>Petrol</option>
                    <option value='Diesel'>Diesel</option>
                    <option value='Hybrid'>Hybrid</option>
                    <option value='Electric'>Electric</option>
                  </select>
                  {errors.fuelType && <p className='text-red-500 text-xs mt-1'>{errors.fuelType.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Transmission *</label>
                  <select {...register('transmission')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                    <option value=''>Select</option>
                    <option value='Manual'>Manual</option>
                    <option value='Automatic'>Automatic</option>
                  </select>
                  {errors.transmission && <p className='text-red-500 text-xs mt-1'>{errors.transmission.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Engine Size</label>
                  <input {...register('engineSize')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='2.0L' />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Body Type</label>
                  <select {...register('bodyType')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                    <option value=''>Select</option>
                    <option value='SUV'>SUV</option>
                    <option value='Hatchback'>Hatchback</option>
                    <option value='Sedan'>Sedan</option>
                    <option value='Van'>Van</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Color</label>
                  <input {...register('color')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='Black' />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Price (GBP) *</label>
                  <input type='number' {...register('price')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                  {errors.price && <p className='text-red-500 text-xs mt-1'>{errors.price.message}</p>}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Location</label>
                  <input {...register('location')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Condition *</label>
                  <select {...register('condition')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                    <option value='New'>New</option>
                    <option value='Used'>Used</option>
                  </select>
                </div>
                
                <div>
                  <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Status</label>
                  <select {...register('status')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                    <option value='AVAILABLE'>Available</option>
                    <option value='RESERVED'>Reserved</option>
                    <option value='SOLD'>Sold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Description *</label>
                <textarea 
                  {...register('description')} 
                  rows={4} 
                  className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' 
                />
                {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
              </div>

              <div className='flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                <button
                  type='submit'
                  disabled={updating}
                  className='px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl'
                >
                  {updating ? 'Updating...' : 'Update Vehicle'}
                </button>
                <button
                  type='button'
                  onClick={closeEditModal}
                  className='px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Lists
