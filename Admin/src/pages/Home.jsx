  import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
  
  function Home() {
    return (
      <div className='w-[100vw] h-[100vh]  bg-gradient-to-t from-[#141414] to-[#0c2025] relative text-[white]'>
        <Nav/>
  <div className="fixed top-0 left-0 w-full h-[70px] bg-[#0c2025] z-40"></div> {/* ← Add this */}

        <Sidebar/>
        </div>
    )
  }
  
  export default Home