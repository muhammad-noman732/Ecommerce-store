import React from 'react'
import { Link } from 'react-router-dom'

function HeroBanner({ imageSrc }) {
  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative w-full bg-gradient-to-b from-[#0b1220] via-[#0e1a2b] to-[#0b1220] py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <img src={imageSrc} alt="Hero" className="w-full max-w-md md:max-w-lg drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left space-y-4">
              <p className="text-[#a9c7ff] uppercase tracking-wide text-sm md:text-base">Your Road to the Perfect Ride</p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Driving Dreams into <span className="text-[#7aa2ff]">Reality</span> with us</h1>
              <p className="text-[#cfe] text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                Experience car buying like never before. We offer an extensive range of options,
                unbeatable deals, expert guidance, and a hassle-free journey to your dream vehicle.
                Discover, compare, and drive with confidence.
              </p>
              <div className="pt-2">
                <Link to="/collection" className="inline-block bg-[#5f6df7] hover:bg-[#4e5be6] text-white px-6 py-3 rounded-lg shadow transition-colors">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bottom wave shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0b1220"></path>
        </svg>
      </div>
    </div>
  )
}

export default HeroBanner


