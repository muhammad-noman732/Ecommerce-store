import React from 'react'
import logo from "/vcart logo.png"

function Footer() {
  return (
    <div className='w-[100%] md:h-[41vh] h-[21vh] mb-[77px] md:mb-[0px] '>
        
        <div className='w-[100%] md:h-[36vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px] gap-[50px] pb-[27px]'>



        <div className='md:w-[30%] w-[35%] h-[100%] flex  justify-center flex-col gap-[5px]'>

            <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>

                <img src={logo} className='md:w-[40px] md:h-[40px] w-[30px] h-[30px] ' />

                <p className='text-[19px] md:text-[20px] text-[black] '>OneCart</p>

            </div>

    <p className='text-[15px] text-[#1e2223]  hidden md:block'>OneCart is your all-in-one online shopping destination, offering top-quality products , unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier everyday. </p>

         <p className='text-[15px] text-[#1e2223] flex md:hidden'>
                    Fast. Easy. Reliable. OneCart Shopping
                </p>        



        </div>

            <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
              <div className='flex items-center justify-center mt-[10px] md:mt-[40px] '>

             <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>

                </div>

            <ul>
                <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>

                <li className='text-[15px] text-[#1e2223]  cursor-pointer'>About Us</li>
                <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
                <li className='text-[15px] text-[#1e2223]  cursor-pointer'>Privacy Policy</li>
            </ul>

            </div>

     <div className='md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center '>

        <div className='flex items-center justify-center mt-[10px] md:mt-[40px] '>

             <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>Get In Touch</p>

                </div>

      <ul>

            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+92-ABCDEFGHI</li>


            <li className='text-[15px] text-[#1e2223]  cursor-pointer'>contact@onecart.com</li>

            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>

            <li className='text-[15px] text-[#1e2223]  cursor-pointer'>admin@onecart.com</li>
            </ul>                    

                </div>        

        </div>

        {/* line div*/}
        <div className='w-[100%] h-[1px] bg-sky-400'></div>

        <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center py-[1px]'>
            Copyright 2025@onecart.com -All Rights Reserved.
        </div>

        </div>
  )
}

export default Footer