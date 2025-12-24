import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { shopDataContext } from '../Context/ShopContext'
import CarCard from '../Components/CarCard'
import CategoryCard from '../Components/CategoryCard'
import FeatureCard from '../Components/FeatureCard'
import { FaShieldAlt, FaAward, FaHeart } from 'react-icons/fa'
import heroIllustration from '../images/hero.png'
import japaneseCategory from '../images/aboutUs.png'
import ukCategory from '../images/aboutUs2.png'

function Home() {
    const { products } = useContext(shopDataContext)
    const [featuredVehicles, setFeaturedVehicles] = useState([])

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            // Get available vehicles, limit to 8
            const available = products
                .filter(item => item.status === 'AVAILABLE' || !item.status)
                .slice(0, 8)
            setFeaturedVehicles(available)
        }
    }, [products])

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="pt-12 pb-20 gradient-hero">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-fade-in">
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                                Driving Reliability.{" "}
                                <span className="gradient-primary bg-clip-text text-transparent">Delivering Excellence.</span>
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                Premium Taxi Rentals, Genuine Spare Parts & Trusted Cargo Services Across the UK.
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                At IMK AUTOS (UK) LTD, we provide dependable mobility and logistics solutions designed for
                                drivers, businesses, and communities. From rental taxis for professional drivers to high-quality
                                automotive spare parts and secure cargo transport services, we deliver value through reliability,
                                professionalism, and customer-first commitment.
                            </p>
                            <Link to="/product">
                                <button className="gradient-primary text-white font-semibold text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-opacity animate-glow">
                                    Get Started Today
                                </button>
                            </Link>
                        </div>
                        <div className="animate-float">
                            <img
                                src={heroIllustration}
                                alt="Premium car dealership"
                                className="w-full rounded-3xl card-shadow"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/800x600?text=Hero+Image'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Services Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                        Our Key Services
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Reliable services you can trust
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Taxi Rentals for Drivers
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Flexible, fully-maintained vehicles available for professional drivers across major UK cities.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Automotive Spare Parts
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Quality-tested, reliable, and durable spare parts for a wide range of vehicles.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Cargo & Transport Services
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Secure, efficient, and timely cargo delivery solutions for businesses of all sizes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Products & Services</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Explore our latest offerings and solutions
                            </p>
                        </div>
                        <Link to="/product">
                            <button className="hidden md:inline-flex border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                View All Products
                            </button>
                        </Link>
                    </div>
                    {featuredVehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredVehicles.map((car, index) => (
                                <CarCard
                                    key={car._id || index}
                                    {...car}
                                    id={car._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-12">
                            No vehicles available at the moment.
                        </p>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="about" className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                        Why Choose IMK AUTOS (UK) LTD?
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                        Your trusted partner for reliable mobility and logistics solutions
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={FaShieldAlt}
                            title="Reliable & Professional"
                            description="Fully-maintained vehicles and quality-tested parts ensure dependable service for drivers and businesses across the UK."
                        />
                        <FeatureCard
                            icon={FaAward}
                            title="Quality Assurance"
                            description="Every taxi rental undergoes thorough inspection, and all spare parts meet industry standards for durability and performance."
                        />
                        <FeatureCard
                            icon={FaHeart}
                            title="Customer-First Commitment"
                            description="Flexible rental terms, competitive pricing, and timely cargo delivery backed by dedicated support for your success."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-20 gradient-primary">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                        Find Your Perfect Car Today!
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Browse our extensive inventory of premium Japanese imports and UK-manufactured vehicles
                    </p>
                    <Link to="/product">
                        <button className="bg-white text-red-600 font-semibold text-lg px-8 py-6 rounded-lg hover:bg-gray-100 transition-colors">
                            Explore Inventory
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="py-12 bg-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                                IMK AUTOS (UK) LTD
                            </h3>
                            <p className="text-gray-400">
                                Your trusted partner for taxi rentals, automotive spare parts, and cargo services.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link to="/" className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/product" className="hover:text-white transition-colors">
                                        Products & Services
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Our Services</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Taxi Rentals</li>
                                <li>Spare Parts</li>
                                <li>Cargo Services</li>
                                <li>Maintenance Support</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Email: info@imkautos.co.uk</li>
                                <li>Phone: 07851 386 785</li>
                                <li>Location: London, UK</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 IMK Autos (UK) Ltd. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Old Components - Commented for Reference */}
            {/* 
            <HeroCars />
            <AboutCars />
            <FeaturesCars />
         <Product/>
            <Background heroCount={heroCount}/>
            <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}/>
         <OurPolicy/> 
         <NewLetterBox/>  
            */}
        </div>
    )
}

export default Home
