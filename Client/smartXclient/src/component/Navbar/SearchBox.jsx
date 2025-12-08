import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from 'react-redux';


const SearchBox = () => {

  return (
    <div className='flex flex-center'>
        <input type="text" className='bg-purple-600 outline-none w-[690px] px-2 py-2 rounded text-[16px] hover:bg-purple-800' placeholder='Search for Products, Brands and More'/>
     <div className='bg-purple-950 -ml-7 p-2'>
         <FaMagnifyingGlass size={25} className='cursor-pointer'/>
     </div>
    </div>
  )
}

export default SearchBox
