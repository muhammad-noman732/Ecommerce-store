import React from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaAward, FaHeart, FaCheckCircle, FaUserCheck, FaChartLine, FaHandshake, FaTools } from 'react-icons/fa'
import about from '../images/aboutUs.png'
import about2 from '../images/aboutUs2.png'
import Footer from './Footer'

function AboutCars() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About IMK Autos (UK) Ltd
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner for premium Japanese imports and UK-manufactured vehicles
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-12 md:py-16 bg-white dark:bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          {/* Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-[#7e22ce] text-3xl font-bold mb-2">1</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#101010] dark:text-gray-900 mb-4">
                IMK Autos (UK) Ltd — where your vehicle journey begins
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#545454] dark:text-gray-700 leading-7 text-justify mb-4">
                At IMK Autos (UK) Ltd, we bring quality, reliability, and choice to the forefront of vehicle sales. Based in the UK, our company specialises in sourcing and supplying a wide range of cars and vans to suit every need—from everyday drivers to commercial fleets.
              </p>
              <p className="text-[15px] md:text-[16px] text-[#545454] dark:text-gray-700 leading-7 text-justify mb-4 font-semibold">
                We proudly offer:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#545454] dark:text-gray-700 space-y-3 text-justify">
                <li>
                  <strong>Japanese Imported Vehicles:</strong> Renowned for their engineering excellence, fuel efficiency, and advanced features, our Japanese imports include popular models from trusted brands. Each vehicle is carefully selected and inspected to meet UK standards.
                </li>
                <li>
                  <strong>UK-Manufactured Cars and Vans:</strong> We also stock a diverse selection of British-built vehicles, offering robust performance, practicality, and value for money. Whether you're looking for a reliable family car or a durable work van, we've got you covered.
                </li>
              </ul>
              <div className="mt-6">
                <Link to="/product" className="inline-block bg-[#101010] text-white px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                  Explore Now
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <img src={about} alt="About IMK Autos" className="w-full max-w-xl rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mt-16">
            <div className="flex justify-center lg:justify-center px-0 lg:px-8">
              <img src={about2} alt="We understand your needs" className="w-full max-w-xl rounded-lg shadow-lg" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[#7e22ce] text-3xl font-bold mb-2">2</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#101010] dark:text-gray-900 mb-4">
                The best car buying partner — we understand your needs
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#545454] dark:text-gray-700 leading-7 text-justify mb-4">
                We're more than just a website; we're your trusted partner in finding the perfect vehicle. With a passion for automobiles and a dedication to your satisfaction, we've curated a vast selection of cars to suit every need and budget. Our mission is to simplify the car-buying process, providing you with the tools and resources you need to make informed decisions. Our team of experts is here to guide you, offering valuable insights and advice along the way.
              </p>
              
              <p className="text-[15px] md:text-[16px] text-[#545454] dark:text-gray-700 leading-7 text-justify mb-4 font-semibold">
                Why Choose IMK Autos?
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#545454] dark:text-gray-700 space-y-3 text-justify">
                <li>
                  <strong>Expertise in Imports & Compliance:</strong> We handle all import documentation, registration, and compliance checks, ensuring a smooth and transparent buying experience.
                </li>
                <li>
                  <strong>Quality Assurance:</strong> Every vehicle undergoes thorough inspection and servicing before sale.
                </li>
                <li>
                  <strong>Customer-Focused Service:</strong> Our team is committed to helping you find the right vehicle at the right price, with honest advice and after-sales support.
                </li>
              </ul>
              
              <p className="text-[15px] md:text-[16px] text-[#545454] dark:text-gray-700 leading-7 text-justify mb-4">
                Whether you're upgrading your personal car or expanding your business fleet, IMK Autos (UK) Ltd is your trusted partner for dependable vehicles and professional service.
              </p>
              
              <div className="mt-6">
                <Link to="/product" className="inline-block bg-[#7e22ce] text-white px-6 py-3 rounded-lg hover:bg-[#6b1db2] transition-colors">
                  Shop Now
                </Link>
              </div>
              <div className="mt-6 text-[#545454] dark:text-gray-700">
                <p className="text-lg font-semibold">
                  <strong>Phone:</strong> 07851 386 785
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at IMK Autos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center md:text-left">
                Trust & Integrity
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                We build lasting relationships based on honesty, transparency, and reliable service. Every vehicle is presented with complete transparency about its history and condition.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                <FaAward className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center md:text-left">
                Quality Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                Our rigorous quality standards ensure that every vehicle meets or exceeds UK regulations. We're committed to delivering vehicles that exceed expectations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6 mx-auto md:mx-0">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center md:text-left">
                Customer First
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                Your satisfaction is our priority. From initial inquiry to after-sales support, we're dedicated to providing exceptional service at every step of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A streamlined process designed to make your vehicle purchase simple and stress-free
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Browse & Select</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore our extensive inventory of premium vehicles. Use our filters to find exactly what you're looking for.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Inspection & Verification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every vehicle undergoes comprehensive checks. We verify history, compliance, and condition before listing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Expert Consultation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our team provides personalized advice, answers your questions, and helps you make an informed decision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Complete Purchase</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We handle all paperwork, registration, and compliance. Drive away with confidence and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for a complete vehicle buying experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaCheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Import & Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Full documentation handling, UK registration, and compliance verification for imported vehicles.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaTools className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Pre-Sale Inspection
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comprehensive multi-point inspection and servicing to ensure vehicle reliability and safety.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaUserCheck className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Expert Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Personalized guidance from our automotive experts to help you find the perfect vehicle for your needs.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaHandshake className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                After-Sales Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ongoing assistance and support after your purchase to ensure continued satisfaction.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaChartLine className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Fleet Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Specialized services for businesses looking to expand or upgrade their commercial vehicle fleet.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <FaShieldAlt className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Peace of Mind
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Transparent pricing, detailed vehicle history, and complete documentation for your confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Commitment to You
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            At IMK Autos (UK) Ltd, we're committed to providing exceptional service, quality vehicles, and complete transparency. 
            Whether you're purchasing your first car or adding to your collection, we're here to make the process seamless and enjoyable.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">100%</p>
              <p className="text-sm">Compliance Verified</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">24/7</p>
              <p className="text-sm">Customer Support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">100%</p>
              <p className="text-sm">Quality Assured</p>
            </div>
          </div>
          <Link to="/contact">
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Get In Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutCars
