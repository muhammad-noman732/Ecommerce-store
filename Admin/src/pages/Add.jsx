import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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

function Add() {
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = useForm({
    resolver: zodResolver(vehicleSchema),
    mode: 'onBlur',
    defaultValues: { location: 'UK', condition: 'Used', status: 'AVAILABLE' }
  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    //  a new image 
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const onSubmit = async (values) => {
    if (images.length === 0) {
      setError('root', { type: 'manual', message: 'Please upload at least one image' })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      Object.keys(values).forEach(key => formData.append(key, values[key]))

      images.forEach((img, idx) => {
        formData.append(`image${idx + 1}`, img.file)
      })

      const result = await axios.post(serverUrl + '/api/product/addproduct', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (result.data) {
        reset()
        setImages([])
        navigate('/lists')
      }
    } catch (error) {
      setError('root', { type: 'manual', message: error.response?.data?.message || 'Failed to add vehicle' })
    } finally {
      setLoading(false)
    }
    }
    
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 pt-[70px]'>
        <Nav/>
        <Sidebar/>
      <div className='md:ml-[260px] ml-[64px] p-6 md:p-10'>
        <div className='max-w-4xl mx-auto animate-fade-in'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2'>Add New Vehicle</h1>
          <p className='text-gray-600 dark:text-gray-400 mb-8'>Add a new vehicle to your inventory</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-6 card-shadow animate-fade-in-up'>
            {errors.root && (
              <div className='bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 text-red-700 dark:text-red-400'>{errors.root.message}</div>
            )}

            {/* Images Section */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3'>Vehicle Images</label>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
                {images.map((img, idx) => (
                  <div key={idx} className='relative group'>
                    <img src={img.preview} alt={`Preview ${idx + 1}`} className='w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700' />
                    <button type='button' onClick={() => removeImage(idx)} className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600'>
                      <FiX size={18} />
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                  <label className='flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-gray-50 dark:bg-gray-700/50'>
                    <FiUpload size={24} className='text-gray-500 dark:text-gray-400 mb-2' />
                    <span className='text-xs text-gray-600 dark:text-gray-400'>Add Image</span>
                    <input type='file' accept='image/*' multiple onChange={handleImageChange} className='hidden' />
        </label>  
                )}
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Title *</label>
                <input {...register('title')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='e.g., 2020 Toyota Camry' />
                {errors.title && <p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>}
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Stock Number *</label>
                <input {...register('stockNumber')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='STOCK001' />
                {errors.stockNumber && <p className='text-red-500 text-xs mt-1'>{errors.stockNumber.message}</p>}
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Brand *</label>
                <input {...register('brand')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='Toyota' />
                {errors.brand && <p className='text-red-500 text-xs mt-1'>{errors.brand.message}</p>}
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Model *</label>
                <input {...register('model')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='Camry' />
                {errors.model && <p className='text-red-500 text-xs mt-1'>{errors.model.message}</p>}
            </div>  
            
              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Year *</label>
                <input type='number' {...register('year')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='2020' />
                {errors.year && <p className='text-red-500 text-xs mt-1'>{errors.year.message}</p>}
        </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Mileage *</label>
                <input type='number' {...register('mileage')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='50000' />
                {errors.mileage && <p className='text-red-500 text-xs mt-1'>{errors.mileage.message}</p>}
         </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Fuel Type *</label>
                <select {...register('fuelType')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
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
                <select {...register('transmission')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
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
                <select {...register('bodyType')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
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
                <input type='number' {...register('price')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='25000' />
                {errors.price && <p className='text-red-500 text-xs mt-1'>{errors.price.message}</p>}
         </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Location</label>
                <input {...register('location')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent' placeholder='UK' />
          </div>
          
              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Condition *</label>
                <select {...register('condition')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                  <option value='New'>New</option>
                  <option value='Used'>Used</option>
                </select>
         </div>

              <div>
                <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Status</label>
                <select {...register('status')} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent'>
                  <option value='AVAILABLE'>Available</option>
                  <option value='RESERVED'>Reserved</option>
                  <option value='SOLD'>Sold</option>
                </select>
              </div>
        </div> 

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Description *</label>
              <textarea {...register('description')} rows={4} className='w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none' placeholder='Enter detailed description...' />
              {errors.description && <p className='text-red-500 dark:text-red-400 text-xs mt-1'>{errors.description.message}</p>}
        </div>

            {/* Submit */}
            <div className='flex gap-4 pt-4'>
              <button type='submit' disabled={loading || isSubmitting} className='px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl'>
                {loading || isSubmitting ? 'Adding Vehicle...' : 'Add Vehicle'}
              </button>
              <button type='button' onClick={() => navigate('/lists')} className='px-8 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition-colors'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Add
