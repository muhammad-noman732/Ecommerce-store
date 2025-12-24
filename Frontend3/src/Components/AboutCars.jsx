import React from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaAward, FaHeart, FaCheckCircle, FaCog, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa'
import about from '../images/aboutUs.png'
import about2 from '../images/aboutUs2.png'
import Footer from './Footer'

function AboutCars() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            About IMK AUTOS (UK) LTD
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner for taxi rentals, automotive spare parts, and cargo services
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                Who We Are
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 text-justify mb-6">
                IMK AUTOS (UK) LTD is a UK-registered mobility and logistics company dedicated to providing
                reliable taxi rentals, certified spare parts, and efficient cargo services. Our operations are built
                on strong values, high standards, and a commitment to long-term customer satisfaction.
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 text-justify">
                From professional drivers requiring flexible vehicle rentals to businesses needing dependable cargo
                solutions, we serve as your comprehensive partner in mobility and logistics across the UK.
              </p>
              <div className="mt-6">
                <Link to="/contact" className="inline-block gradient-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
              <img src={about} alt="About IMK AUTOS" className="w-full max-w-xl rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To deliver reliable, efficient, and high-quality mobility and logistics solutions by providing
                trusted taxi rentals, genuine spare parts, and secure cargo services across the UK—ensuring
                customer satisfaction, operational excellence, and long-term value.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6">
                <FaLightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To become the UK's most trusted and customer-focused provider of mobility, automotive parts,
                and cargo solutions—setting new standards for reliability, quality, and service excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at IMK AUTOS (UK) LTD
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reliability */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Reliability
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dependable service you can count on, every time.
              </p>
            </div>

            {/* Integrity */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaHandshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Integrity
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Honest, transparent, and ethical in all we do.
              </p>
            </div>

            {/* Customer Focus */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Customer Focus
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your satisfaction is our top priority.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaAward className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Excellence in every product and service.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaLightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Innovation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continuously improving our services.
              </p>
            </div>

            {/* Professionalism */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Professionalism
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expert service with a professional approach.
              </p>
            </div>

            {/* Safety */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Safety
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your safety is our constant concern.
              </p>
            </div>

            {/* Commitment */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4">
                <FaCheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Commitment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dedicated to your long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
            <div className="flex justify-center lg:justify-center">
              <img src={about2} alt="Our Services" className="w-full max-w-xl rounded-lg shadow-lg" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                What We Offer
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-7 text-justify mb-6">
                IMK AUTOS (UK) LTD provides three core services designed to support drivers, businesses, and
                communities across the United Kingdom.
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Taxi Rentals for Drivers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Flexible, fully-maintained vehicles for professional drivers across major UK cities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCog className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Automotive Spare Parts</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Quality-tested, reliable parts for a wide range of vehicles.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <FaCheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Cargo & Transport Services</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Secure, efficient cargo delivery for businesses of all sizes.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <Link to="/product" className="inline-block gradient-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Explore Our Services
                </Link>
              </div>
              <div className="mt-6">
                <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  <strong>Phone:</strong> <a href="tel:07851386785" className="text-red-600 hover:text-red-700">07851 386 785</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
            Whether you need a taxi rental, quality spare parts, or reliable cargo services,
            IMK AUTOS (UK) LTD is here to help. Contact us today to discuss your requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">100%</p>
              <p className="text-sm">Quality Assured</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">UK-Wide</p>
              <p className="text-sm">Service Coverage</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20">
              <p className="text-2xl font-bold mb-1">24/7</p>
              <p className="text-sm">Support Available</p>
            </div>
          </div>
          <Link to="/contact">
            <button className="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutCars
