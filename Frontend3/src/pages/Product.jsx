import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../Context/ShopContext'
import CarCard from '../Components/CarCard'
import { FaSearch, FaSlidersH } from 'react-icons/fa'

function Product() {
    const { products, getProducts } = useContext(shopDataContext)
    
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(true)
    const [priceRange, setPriceRange] = useState([0, 0])
    
    const [selectedBrand, setSelectedBrand] = useState('all')
    const [selectedFuelType, setSelectedFuelType] = useState('all')
    const [selectedTransmission, setSelectedTransmission] = useState('all')
    const [selectedCondition, setSelectedCondition] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [minYear, setMinYear] = useState('')
    const [maxYear, setMaxYear] = useState('')
    
    const [sortBy, setSortBy] = useState('newest')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(12)
    
    const [displayedVehicles, setDisplayedVehicles] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    
    const availableBrands = React.useMemo(() => {
        if (!Array.isArray(products)) return []
        const brands = [...new Set(products.map(v => v.brand).filter(Boolean))]
        return brands.sort()
    }, [products])
    
    const { minPrice, maxPrice, minYearAvailable, maxYearAvailable } = React.useMemo(() => {
        if (!Array.isArray(products) || products.length === 0) {
            return { minPrice: 0, maxPrice: 100000, minYearAvailable: 1990, maxYearAvailable: new Date().getFullYear() }
        }
        
        const prices = products.map(v => v.price || 0).filter(p => p > 0)
        const years = products.map(v => v.year || 0).filter(y => y > 0)
        
        return {
            minPrice: prices.length > 0 ? Math.floor(Math.min(...prices) / 1000) * 1000 : 0,
            maxPrice: prices.length > 0 ? Math.ceil(Math.max(...prices) / 1000) * 1000 : 100000,
            minYearAvailable: years.length > 0 ? Math.min(...years) : 1990,
            maxYearAvailable: years.length > 0 ? Math.max(...years) : new Date().getFullYear()
        }
    }, [products])
    
    useEffect(() => {
        if (maxPrice > 0 && priceRange[1] === 0) {
            setPriceRange([minPrice, maxPrice])
        }
    }, [minPrice, maxPrice])
    
    useEffect(() => {
        getProducts(1, 1000)
    }, [])
    useEffect(() => {
        if (!Array.isArray(products)) {
            setDisplayedVehicles([])
            return
        }
        
        // Apply filters
        let filtered = products.filter(vehicle => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase()
                const matchesSearch = 
                    vehicle.title?.toLowerCase().includes(query) ||
                    vehicle.brand?.toLowerCase().includes(query) ||
                    vehicle.model?.toLowerCase().includes(query) ||
                    vehicle.year?.toString().includes(query)
                if (!matchesSearch) return false
            }
            
            // Brand filter
            if (selectedBrand !== 'all' && vehicle.brand?.toLowerCase() !== selectedBrand.toLowerCase()) {
                return false
            }
            
            // Fuel type filter
            if (selectedFuelType !== 'all' && vehicle.fuelType?.toLowerCase() !== selectedFuelType.toLowerCase()) {
                return false
            }
            
            // Transmission filter
            if (selectedTransmission !== 'all' && vehicle.transmission?.toLowerCase() !== selectedTransmission.toLowerCase()) {
                return false
            }
            
            // Condition filter
            if (selectedCondition !== 'all' && vehicle.condition?.toLowerCase() !== selectedCondition.toLowerCase()) {
                return false
            }
            
            // Status filter (backend uses uppercase: 'AVAILABLE', 'SOLD', 'RESERVED')
            if (selectedStatus !== 'all') {
                const vehicleStatus = vehicle.status?.toUpperCase() || ''
                const selectedStatusUpper = selectedStatus.toUpperCase()
                if (selectedStatusUpper === 'AVAILABLE' && vehicleStatus !== 'AVAILABLE') return false
                if (selectedStatusUpper === 'SOLD' && vehicleStatus !== 'SOLD') return false
                if (selectedStatusUpper === 'RESERVED' && vehicleStatus !== 'RESERVED') return false
            }
            
            // Year filter (only if both min and max are provided)
            if (minYear && maxYear) {
                const vehicleYear = vehicle.year || 0
                const min = parseInt(minYear)
                const max = parseInt(maxYear)
                if (vehicleYear < min || vehicleYear > max) {
                    return false
                }
            } else if (minYear) {
                // Only min year provided
                const vehicleYear = vehicle.year || 0
                if (vehicleYear < parseInt(minYear)) {
                    return false
                }
            } else if (maxYear) {
                // Only max year provided
                const vehicleYear = vehicle.year || 0
                if (vehicleYear > parseInt(maxYear)) {
                    return false
                }
            }
            
            // Price range filter (only if range is set)
            if (priceRange[0] > 0 || priceRange[1] > 0) {
                const vehiclePrice = vehicle.price || 0
                if (priceRange[0] > 0 && vehiclePrice < priceRange[0]) {
                    return false
                }
                if (priceRange[1] > 0 && vehiclePrice > priceRange[1]) {
                    return false
                }
            }
            
            return true
        })
        
        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return (a.price || 0) - (b.price || 0)
                case 'price-high':
                    return (b.price || 0) - (a.price || 0)
                case 'mileage':
                    return (a.mileage || 0) - (b.mileage || 0)
                case 'year':
                    return (b.year || 0) - (a.year || 0)
                case 'newest':
                default:
                    // Sort by createdAt (newest first), fallback to _id if createdAt not available
                    const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0
                    const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0
                    return bDate - aDate
            }
        })
        
        // Calculate pagination
        const total = filtered.length
        const pages = Math.ceil(total / itemsPerPage)
        setTotalPages(pages)
        
        // Apply pagination
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginated = filtered.slice(startIndex, endIndex)
        
        setDisplayedVehicles(paginated)
    }, [products, searchQuery, selectedBrand, selectedFuelType, selectedTransmission, 
        selectedCondition, selectedStatus, minYear, maxYear, priceRange, sortBy, currentPage, itemsPerPage])
    
    // ==================== RESET FILTERS ====================
    const resetFilters = () => {
        setSearchQuery('')
        setSelectedBrand('all')
        setSelectedFuelType('all')
        setSelectedTransmission('all')
        setSelectedCondition('all')
        setSelectedStatus('all')
        setMinYear('')
        setMaxYear('')
        setPriceRange([minPrice, maxPrice])
        setSortBy('newest')
        setCurrentPage(1)
    }
    
    // ==================== RENDER ====================
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <div className="container mx-auto px-6 py-8">
                
                {/* ========== HEADER SECTION ========== */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Vehicle Inventory
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Browse our complete collection of premium vehicles
                    </p>
                </div>
                
                {/* ========== SEARCH & SORT BAR ========== */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-8 card-shadow">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by brand, model, or year..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="w-full pl-10 pr-4 h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        
                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value)
                                setCurrentPage(1)
                            }}
                            className="w-full md:w-48 h-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="newest">Newest First</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="mileage">Lowest Mileage</option>
                            <option value="year">Year: Newest</option>
                        </select>
                        
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden h-12 px-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            <FaSlidersH className="h-5 w-5" />
                            Filters
                        </button>
                    </div>
                </div>
                
                {/* ========== MAIN CONTENT GRID ========== */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* ========== FILTERS SIDEBAR ========== */}
                    {showFilters && (
                        <aside className="lg:w-80 space-y-6 animate-fade-in">
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 card-shadow">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                    <FaSlidersH className="mr-2 h-5 w-5 text-purple-600" />
                                    Filters
                                </h3>
                                
                                <div className="space-y-6">
                                    
                                    {/* Brand Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Brand
                                        </label>
                                        <select
                                            value={selectedBrand}
                                            onChange={(e) => {
                                                setSelectedBrand(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Brands</option>
                                            {availableBrands.map(brand => (
                                                <option key={brand} value={brand.toLowerCase()}>
                                                    {brand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                    {/* Price Range Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Price Range (£)
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Min</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="100"
                                                        placeholder="Min"
                                                        value={priceRange[0] || ''}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value) || 0
                                                            setPriceRange([val, priceRange[1] || maxPrice])
                                                            setCurrentPage(1)
                                                        }}
                                                        className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Max</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="100"
                                                        placeholder="Max"
                                                        value={priceRange[1] || ''}
                                                        onChange={(e) => {
                                                            const val = parseInt(e.target.value) || maxPrice
                                                            setPriceRange([priceRange[0] || 0, val])
                                                            setCurrentPage(1)
                                                        }}
                                                        className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
                                                <span>£{(priceRange[0] || 0).toLocaleString()}</span>
                                                <span>£{(priceRange[1] || maxPrice).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Year Range Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Year Range
                                        </label>
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">From</label>
                                                    <input
                                                        type="number"
                                                        min={minYearAvailable}
                                                        max={maxYearAvailable}
                                                        placeholder={`Min: ${minYearAvailable}`}
                                                        value={minYear}
                                                        onChange={(e) => {
                                                            setMinYear(e.target.value)
                                                            setCurrentPage(1)
                                                        }}
                                                        className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">To</label>
                                                    <input
                                                        type="number"
                                                        min={minYearAvailable}
                                                        max={maxYearAvailable}
                                                        placeholder={`Max: ${maxYearAvailable}`}
                                                        value={maxYear}
                                                        onChange={(e) => {
                                                            setMaxYear(e.target.value)
                                                            setCurrentPage(1)
                                                        }}
                                                        className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
                                                Available: {minYearAvailable} - {maxYearAvailable}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Fuel Type Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Fuel Type
                                        </label>
                                        <select
                                            value={selectedFuelType}
                                            onChange={(e) => {
                                                setSelectedFuelType(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="petrol">Petrol</option>
                                            <option value="diesel">Diesel</option>
                                            <option value="hybrid">Hybrid</option>
                                            <option value="electric">Electric</option>
                                        </select>
                                    </div>
                                    
                                    {/* Transmission Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Transmission
                                        </label>
                                        <select
                                            value={selectedTransmission}
                                            onChange={(e) => {
                                                setSelectedTransmission(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Types</option>
                                            <option value="automatic">Automatic</option>
                                            <option value="manual">Manual</option>
                                        </select>
                                    </div>
                                    
                                    {/* Condition Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Condition
                                        </label>
                                        <select
                                            value={selectedCondition}
                                            onChange={(e) => {
                                                setSelectedCondition(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Conditions</option>
                                            <option value="new">New</option>
                                            <option value="used">Used</option>
                                        </select>
                                    </div>
                                    
                                    {/* Status Filter */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 block">
                                            Status
                                        </label>
                                        <select
                                            value={selectedStatus}
                                            onChange={(e) => {
                                                setSelectedStatus(e.target.value)
                                                setCurrentPage(1)
                                            }}
                                            className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="all">All Status</option>
                                            <option value="available">Available</option>
                                            <option value="reserved">Reserved</option>
                                            <option value="sold">Sold</option>
                                        </select>
                                    </div>
                                    
                                    {/* Filter Buttons */}
                                    <button
                                        onClick={resetFilters}
                                        className="w-full h-12 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </aside>
                    )}
                    
                    {/* ========== VEHICLES GRID ========== */}
                    <main className="flex-1">
                        {/* Results Count */}
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-600 dark:text-gray-400">
                                Showing <span className="font-semibold text-gray-900 dark:text-gray-100">
                                    {displayedVehicles.length}
                                </span> vehicles
                                {products.length !== displayedVehicles.length && (
                                    <span className="ml-2 text-sm">
                                        (filtered from {products.length})
                                    </span>
                                )}
                            </p>
                        </div>
                        
                        {/* Vehicles Grid */}
                        {displayedVehicles.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                    {displayedVehicles.map((vehicle) => (
                                        <CarCard
                                            key={vehicle._id}
                                            {...vehicle}
                                            id={vehicle._id}
                                        />
                                    ))}
                                </div>
                                
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Previous
                                        </button>
                                        
                                        {[...Array(totalPages)].map((_, index) => {
                                            const page = index + 1
                                            if (totalPages > 7 && page !== 1 && page !== totalPages && 
                                                Math.abs(page - currentPage) > 1) {
                                                return null
                                            }
                                            return (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                                        currentPage === page
                                                            ? 'gradient-primary text-white'
                                                            : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        })}
                                        
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    No vehicles found matching your filters.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 gradient-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Product
