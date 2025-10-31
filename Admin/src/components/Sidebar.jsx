import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const Item = ({ active, icon, label, onClick }) => (
    <button
      className={`w-full flex items-center md:justify-start justify-center gap-3 px-3 py-2 rounded-lg transition-colors
      ${active ? 'bg-[#1b2a45] text-white' : 'bg-transparent text-[#dbe7ff] hover:bg-[#1f2f4e]'}
      `}
      onClick={onClick}
    >
      {icon}
      <span className='hidden md:block text-[14px] font-medium'>{label}</span>
    </button>
  )

  return (
    <aside className='fixed left-0 top-0 min-h-screen w-[64px] md:w-[220px] bg-gradient-to-b from-[#0b1220] to-[#0e1a2b] border-r border-[#23324a] pt-[80px] px-2 md:px-4 z-30'>
      <div className='flex flex-col gap-3'>
        <Item
          active={pathname === '/add'}
          icon={<IoAddCircleOutline className='w-[22px] h-[22px]'/>}
          label='Add Vehicle'
          onClick={()=>navigate('/add')}
        />
        <Item
          active={pathname === '/lists'}
          icon={<FaRegListAlt className='w-[22px] h-[22px]'/>}
          label='Vehicles'
          onClick={()=>navigate('/lists')}
        />
        <Item
          active={pathname === '/orders'}
          icon={<FiCheckCircle className='w-[22px] h-[22px]'/>}
          label='Orders'
          onClick={()=>navigate('/orders')}
        />
      </div>
    </aside>
  )
}

export default Sidebar