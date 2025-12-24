import React from 'react'
import { Link } from 'react-router-dom'
import { FaCar, FaCog, FaTruck, FaCheckCircle, FaPhoneAlt, FaClock } from 'react-icons/fa'
import Footer from '../Components/Footer'

function Services() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Comprehensive mobility and logistics solutions tailored to your needs
                    </p>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {/* Service 1: Taxi Rentals */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <FaCar className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Taxi Rental Services
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Safe, well-maintained vehicles for licensed drivers
                            </p>
                            <a href="#taxi-rentals" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                                Learn More →
                            </a>
                        </div>

                        {/* Service 2: Spare Parts */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <FaCog className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Automotive Spare Parts
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Reliable, genuine-quality parts for all vehicles
                            </p>
                            <a href="#spare-parts" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                                Learn More →
                            </a>
                        </div>

                        {/* Service 3: Cargo Services */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center mb-6">
                                <FaTruck className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Cargo & Transport Services
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Secure and timely cargo transport solutions
                            </p>
                            <a href="#cargo-services" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                                Learn More →
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 1: Taxi Rental Services - Detailed */}
            <section id="taxi-rentals" className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                                <FaCar className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                1. Taxi Rental Services
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            We offer a wide range of safe, well-maintained vehicles available for rent to licensed drivers.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Weekly & Monthly Rental Options
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Flexible rental periods to suit your driving schedule
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Fully Serviced & Insured Vehicles
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            All vehicles maintained to the highest standards
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            24/7 Support for Drivers
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Round-the-clock assistance whenever you need it
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Suitable for All Platforms
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Perfect for Uber, Bolt, private hire, and local taxi operations
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 2: Automotive Spare Parts - Detailed */}
            <section id="spare-parts" className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                                <FaCog className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                2. Automotive Spare Parts
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Reliable, durable, and genuine-quality spare parts for a variety of vehicles.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Engine Parts
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            High-quality components for optimal engine performance
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Suspension & Brake Components
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Safety-critical parts for smooth and secure driving
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Electrical and Body Parts
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Complete range of electrical and exterior components
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Affordable Prices with Quality Assurance
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Competitive pricing without compromising on quality
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service 3: Cargo & Transport Services - Detailed */}
            <section id="cargo-services" className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                                <FaTruck className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                                3. Cargo & Transport Services
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Secure and timely cargo transport solutions across multiple UK cities.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Business Deliveries
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Professional delivery services for your business needs
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Logistics Support for E-commerce & Retail
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Comprehensive logistics solutions for online businesses
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            Safe Handling of Parcels and Goods
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Careful handling to ensure your cargo arrives intact
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-3 mb-3">
                                    <FaCheckCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            On-time, Reliable Pickup and Delivery
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Punctual service you can depend on
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 gradient-primary text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Need Our Services?
                    </h2>
                    <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                        Get in touch with us today to discuss your requirements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/contact">
                            <button className="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                                <FaPhoneAlt className="w-5 h-5" />
                                Contact Us
                            </button>
                        </Link>
                        <a href="tel:07851386785" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                            <FaClock className="w-5 h-5" />
                            Call: 07851 386 785
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Services
