import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '/logo.jpeg';
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import { shopDataContext } from '../Context/ShopContext';


function Nav() {

  let { serverUrl } = useContext(authDataContext)
  let { userData, setUserData } = useContext(userDataContext)
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  let [showProfile, setShowProfile] = useState(false)
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  let navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      let result = await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
      setUserData("")
      navigate("/login")
    } catch (error) {
      // Error handled silently
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
              <img src={Logo} alt="IMK Autos" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">IMK Autos</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Home
          </Link>
          <Link to="/product" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Inventory
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Icon */}
          {showSearch ? (
            <IoSearchCircle
              className="w-6 h-6 text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={() => setShowSearch(prev => !prev)}
            />
          ) : (
            <IoSearchCircleOutline
              className="w-6 h-6 text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={() => {
                setShowSearch(prev => !prev);
                navigate("/product")
              }}
            />
          )}

          {/* Cart with badge */}
          <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
            <IoMdCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {getCartCount()}
              </span>
            )}
          </div>

          {/* User Profile */}
          {userData == null ? (
            <FaUserCircle
              className="w-6 h-6 text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={() => navigate('/login')}
            />
          ) : (
            <div
              className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer font-semibold"
              onClick={() => setShowProfile(prev => !prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            <HiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="container mx-auto px-6">
            <input
              type="text"
              className="w-full md:w-1/2 mx-auto h-12 bg-white dark:bg-gray-700 rounded-full px-6 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 text-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search vehicles..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && userData && (
        <div className="absolute right-6 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                navigate("/order");
                setShowProfile(false);
              }}
            >
              Orders
            </li>
            <li
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                navigate("/about");
                setShowProfile(false);
              }}
            >
              About
            </li>
            <li
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                handleLogOut();
                setShowProfile(false);
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-4 space-y-3">
            <Link
              to="/"
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/product"
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
