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
                                Driving Dreams Into{" "}
                                <span className="gradient-primary bg-clip-text text-transparent">Reality</span>{" "}
                                With Us
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Experience premium quality with IMK Autos. We specialize in Japanese imports and
                                UK-manufactured vehicles, bringing you the finest selection with expert service and
                                complete compliance assurance.
                            </p>
                            <Link to="/product">
                                <button className="gradient-primary text-white font-semibold text-lg px-8 py-6 rounded-lg hover:opacity-90 transition-opacity animate-glow">
                                    Shop Now
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

            {/* Categories Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                        Explore Our Collection
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Choose from our curated selection of Japanese imports and UK-manufactured vehicles
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <CategoryCard
                            title="Japanese Imported Vehicles"
                            description="Discover iconic Japanese engineering with our premium selection of JDM legends and modern sports cars, all meticulously inspected and UK-compliant."
                            image={japaneseCategory}
                            link="/product?category=japanese"
                        />
                        <CategoryCard
                            title="UK-Manufactured Cars & Vans"
                            description="Experience British luxury and craftsmanship with our range of premium UK vehicles, from elegant sedans to versatile commercial vans."
                            image={ukCategory}
                            link="/product?category=uk"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Vehicles</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Hand-picked premium cars from our exclusive collection
                            </p>
                        </div>
                        <Link to="/product">
                            <button className="hidden md:inline-flex border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                View All Inventory
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
                        Why Choose IMK Autos?
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                        Your trusted partner for premium vehicles with unmatched expertise and service
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={FaShieldAlt}
                            title="Expertise in Imports & Compliance"
                            description="Years of experience ensuring every vehicle meets UK standards with full documentation and peace of mind."
                        />
                        <FeatureCard
                            icon={FaAward}
                            title="Quality Assurance & Inspection"
                            description="Rigorous multi-point inspections and detailed service history verification for every vehicle we sell."
                        />
                        <FeatureCard
                            icon={FaHeart}
                            title="Customer-Focused Service"
                            description="Personalized attention, transparent pricing, and ongoing support throughout your ownership journey."
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
                        <button className="bg-white text-purple-600 font-semibold text-lg px-8 py-6 rounded-lg hover:bg-gray-100 transition-colors">
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
                                IMK Autos (UK) Ltd
                            </h3>
                            <p className="text-gray-400">
                                Your trusted source for premium Japanese imports and UK vehicles.
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
                                        Inventory
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
                            <h4 className="font-semibold mb-4">Categories</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Japanese Imports</li>
                                <li>UK Vehicles</li>
                                <li>Sports Cars</li>
                                <li>Luxury SUVs</li>
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
