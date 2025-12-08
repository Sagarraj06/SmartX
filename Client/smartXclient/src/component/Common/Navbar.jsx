import React from 'react'
import SearchBox from '../Navbar/SearchBox'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";



const Navbar = () => {
  return (
    <div className=''>
        <header className='bg-gray-900 px-4 py-2 flex items-center gap-6'>
            <h2 className='flex items-center font-bold text-4xl'>
                <p>Smart</p> 
                <span className='text-6xl text-yellow-400'>X</span>
            </h2>
            <SearchBox/>
            <nav className=' flex items-center gap-4 font-semibold'>
                <Link to={"#"}> About Us</Link>
                <Link to={"#"}>Contact Us</Link>

                <div className=' flex items-center gap-4'>
                    <Link to={"#"} className='bg-slate-950 px-4 py-2 rounded-md transition-all duration-300 hover:bg-slate-800'>Login</Link>
                    <Link to={"#"} className='bg-slate-950 px-4 py-2 rounded-md transition-all duration-300 hover:bg-slate-800'>Sign Up</Link>
                </div>

                <FaRegHeart size={30} className='cursor-pointer' />


                <div className='flex item-center gap-1 bg-gray-950 rounded-full px-4 py-2 cursor-pointer ransition-all duration-300 hover:bg-slate-800'>
                    <FaPlus size={25} />
                    <p className='font-semibold text-[18px]'>SELL</p>

                </div>

            </nav>
        </header>

        
      
    </div>
  )
}

export default Navbar
