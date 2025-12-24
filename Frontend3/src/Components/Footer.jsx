import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
              IMK AUTOS (UK) LTD
            </h3>
            <p className="text-gray-400 text-sm">
              Reliable mobility, parts, and cargo services across the UK.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Taxi Rentals</li>
              <li>Spare Parts</li>
              <li>Cargo Services</li>
              <li>Maintenance Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="mailto:info@imkautos.co.uk" className="hover:text-white transition-colors">
                  info@imkautos.co.uk
                </a>
              </li>
              <li>
                <a href="tel:07851386785" className="hover:text-white transition-colors">
                  07851 386 785
                </a>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-800">
                <h5 className="font-semibold mb-2 text-white">Follow Us</h5>
                <div className="flex gap-3">
                  <a href="#" className="hover:text-red-400 transition-colors" aria-label="Facebook">
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-red-400 transition-colors" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-red-400 transition-colors" aria-label="LinkedIn">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} IMK AUTOS (UK) LTD Pvt. Ltd. – All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
