import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../Context/ShopContext'
import RelatedProduct from '../Components/RelatedProduct'
import { FiCheck, FiX } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'

function ProductDetailts() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { products, currency, addToCart } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = products.find(item => item._id === productId)
      if (foundProduct) {
        setProductData(foundProduct)
        // Set default image to first image in array, or fallback
        const images = foundProduct.images || []
        if (images.length > 0) {
          setSelectedImageIndex(0)
        }
      }
      setLoading(false)
    }

    if (products.length > 0) {
      fetchProduct()
    }
  }, [productId, products])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading vehicle details...</p>
        </div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Vehicle Not Found</h2>
          <button
            onClick={() => navigate('/product')}
            className="gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    )
  }

  // Get images array or fallback to empty array
  const images = productData.images || []
  const displayImage = images[selectedImageIndex] || (images.length > 0 ? images[0] : 'https://via.placeholder.com/800x600?text=Vehicle+Image')

  // Get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'SOLD':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const handleAddToCart = () => {
    if (productData.status?.toUpperCase() === 'AVAILABLE' || !productData.status) {
      addToCart(productData._id, 'default')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <button onClick={() => navigate('/')} className="hover:text-red-600 dark:hover:text-red-400">
            Home
          </button>
          {' / '}
          <button onClick={() => navigate('/product')} className="hover:text-red-600 dark:hover:text-red-400">
            Inventory
          </button>
          {' / '}
          <span className="text-gray-900 dark:text-gray-100">
            {productData.brand} {productData.model}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <img
                src={displayImage}
                alt={`${productData.brand} ${productData.model}`}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Vehicle+Image'
                }}
              />
              {/* Status Badge */}
              {productData.status && (
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${getStatusBadgeClass(productData.status)}`}>
                    {productData.status}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${selectedImageIndex === idx
                        ? 'border-red-500 ring-2 ring-red-200 dark:ring-red-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-24 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x150?text=Image'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {productData.brand} {productData.model}
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">{productData.year}</p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-red-600 dark:text-red-400">
                  {currency}{productData.price?.toLocaleString() || 'N/A'}
                </span>
                {productData.condition && (
                  <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {productData.condition}
                  </span>
                )}
              </div>
            </div>

            {/* Key Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mileage</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {productData.mileage?.toLocaleString() || 'N/A'} miles
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {productData.fuelType || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {productData.transmission || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engine Size</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {productData.engineSize || 'N/A'}
                  </p>
                </div>
                {productData.bodyType && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Body Type</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {productData.bodyType}
                    </p>
                  </div>
                )}
                {productData.color && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Color</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {productData.color}
                    </p>
                  </div>
                )}
                {productData.location && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {productData.location}
                    </p>
                  </div>
                )}
                {productData.stockNumber && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stock Number</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {productData.stockNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {productData.description && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {productData.description}
                </p>
              </div>
            )}

            {/* Features/Policy */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Buy With Us</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">100% Original Vehicle</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Full Documentation Provided</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Professional Inspection & Compliance</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 dark:text-gray-400">Transparent Pricing - No Hidden Fees</p>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              {productData.status?.toUpperCase() === 'AVAILABLE' || !productData.status ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-semibold text-lg px-8 py-4 rounded-lg cursor-not-allowed"
                >
                  {productData.status === 'SOLD' ? 'Sold Out' : 'Reserved'}
                </button>
              )}
              <button
                onClick={() => navigate('/product')}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-lg px-8 py-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {productData.brand && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Related Vehicles
            </h2>
            <RelatedProduct
              brand={productData.brand}
              currentProductId={productData._id}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailts
