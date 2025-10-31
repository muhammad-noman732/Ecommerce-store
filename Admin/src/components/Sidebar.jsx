import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { FiCheckCircle, FiUsers } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const Item = ({ active, icon, label, onClick }) => (
    <button
      className={`w-full flex items-center md:justify-start justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
      ${active 
        ? 'gradient-primary text-white shadow-lg shadow-purple-500/30 animate-fade-in' 
        : 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400'
      }`}
      onClick={onClick}
    >
      <span className={`${active ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'} transition-colors`}>
        {icon}
      </span>
      <span className={`hidden md:block text-sm font-semibold transition-colors ${active ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
    </button>
  )

  return (
    <aside className='fixed left-0 top-[70px] min-h-[calc(100vh-70px)] w-[64px] md:w-[260px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-30'>
      <div className='flex flex-col gap-2 p-3 md:p-4'>
        <Item
          active={pathname === '/add'}
          icon={<IoAddCircleOutline className='w-5 h-5'/>}
          label='Add Vehicle'
          onClick={()=>navigate('/add')}
        />
        <Item
          active={pathname === '/lists'}
          icon={<FaRegListAlt className='w-5 h-5'/>}
          label='Vehicles'
          onClick={()=>navigate('/lists')}
        />
        <Item
          active={pathname === '/orders'}
          icon={<FiCheckCircle className='w-5 h-5'/>}
          label='Orders'
          onClick={()=>navigate('/orders')}
        />
        <Item
          active={pathname === '/users'}
          icon={<FiUsers className='w-5 h-5'/>}
          label='Users'
          onClick={()=>navigate('/users')}
        />
      </div>
    </aside>
  )
}

export default Sidebar