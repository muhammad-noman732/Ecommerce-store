import React from 'react'
import about from '../images/aboutUs.png'
import about2 from '../images/aboutUs2.png'

function AboutCars() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-[#7e22ce] text-3xl font-bold mb-2">1</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#101010] mb-4">IMK Autos (UK) Ltd — where your vehicle journey begins</h2>
            <p className="text-[15px] md:text-[16px] text-[#545454] leading-7 text-justify">
              At IMK Autos (UK) Ltd, we bring quality, reliability, and choice to the forefront of vehicle sales. Based in the UK, our company specialises in sourcing and supplying a wide range of cars and vans to suit every need — from everyday drivers to commercial fleets.
            </p>
            <ul className="list-disc pl-5 mt-4 text-[#545454] space-y-2">
              <li><b>Japanese Imported Vehicles:</b> Renowned for engineering excellence, fuel efficiency, and advanced features. Each vehicle is carefully selected and inspected to meet UK standards.</li>
              <li><b>UK‑Manufactured Cars and Vans:</b> Robust performance and great value — from reliable family cars to durable work vans.</li>
            </ul>
            <div className="mt-6">
              <a href="#brands" className="inline-block bg-[#101010] text-white px-6 py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors">Explore Now</a>
            </div>
            <p className="mt-6 text-[15px] md:text-[16px] text-[#545454] leading-7 text-justify">
              Why choose IMK Autos? We handle import documentation, registration, and compliance; every vehicle is thoroughly inspected and serviced; and our customer‑focused team provides honest advice with dependable after‑sales support.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
            <img src={about} alt="About IMK Autos" className="w-full max-w-xl" />
          </div>
        </div>

        {/* Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mt-16">
          <div className="flex justify-center lg:justify-center px-0 lg:px-8">
            <img src={about2} alt="We understand your needs" className="w-full max-w-xl" />
          </div>
          <div className="text-center lg:text-left">
            <p className="text-[#7e22ce] text-3xl font-bold mb-2">2</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#101010] mb-4">The best car buying partner — we understand your needs</h2>
            <p className="text-[15px] md:text-[16px] text-[#545454] leading-7 text-justify">
              We’re more than just a website; we’re your trusted partner for dependable vehicles and professional service. Our mission is to simplify the buying process with tools and guidance that help you make confident decisions — whether upgrading your personal car or expanding a business fleet.
            </p>
            <div className="mt-6">
              <a href="#brands" className="inline-block bg-[#7e22ce] text-white px-6 py-3 rounded-lg hover:bg-[#6b1db2] transition-colors">Shop Now</a>
            </div>
            <div className="mt-6 text-[#545454]">
              <p><b>Phone:</b> 07851 386 785</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCars


