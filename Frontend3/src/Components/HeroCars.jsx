import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../images/hero.png'
import '../styles/hero.css'

function HeroCars() {
  return (
    <div className="relative">
      <section className="w-full flex justify-center items-center bg-gradient-to-b from-[#f3eefe] via-[#d5c2ff] to-[#8400ff] py-[100px] md:py-[100px] pb-[125px]">
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
            {/* Image */}
            <div className="order-2 md:order-1 flex justify-center md:justify-start header-img-section">
              <img src={hero} alt="Hello Carwale" className="w-full max-w-md md:max-w-lg img-fluid animate-float" />
            </div>
            {/* Text */}
            <div className="order-1 md:order-2 my-5 md:my-0 text-center md:text-left">
              <p className="text-[24px] font-bold leading-snug mb-[15px] text-[blueviolet]">Your Road to the Perfect Ride</p>
              <h1 className="font-extrabold text-[36px] md:text-[50px] lg:text-[60px] capitalize leading-[1.15] mb-[25px] text-[#101010]">
                Driving Dreams into <span className="text-[blueviolet]">Reality</span> with us
              </h1>
              <p className="text-[17px] font-semibold leading-relaxed mb-[40px] max-w-[450px] text-[#545454] mx-auto md:mx-0 text-justify">
                Experience car buying like never before. CarWale offers an extensive range of options, unbeatable deals, expert guidance, and a hassle-free journey to your dream car. Discover, compare, and drive with confidence.
              </p>
              <div className="flex justify-center md:justify-start mt-[20px]">
                <Link to='/collection' className="inline-block bg-[#101010] text-white px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Bottom wave shape */}
      <div className="custom-shape-divider-bottom-1695048439">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  )
}

export default HeroCars


