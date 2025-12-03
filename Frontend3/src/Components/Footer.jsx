import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-white">
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
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-white transition-colors">Inventory</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
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
              <li>151-157 Huddersfield Road</li>
              <li>Oldham, Greater Manchester OL1 3PA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 IMK Autos (UK) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
