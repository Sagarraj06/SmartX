import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";


const SearchBox = () => {
  return (
    <div className='flex flex-center'>
        <input type="text" className='bg-gray-700 outline-none w-[690px] px-2 py-2 rounded text-[16px]' placeholder='Search for Products, Brands and More'/>
     <div className='bg-gray-950 -ml-7 p-2'>
         <FaMagnifyingGlass size={25} className='cursor-pointer'/>
     </div>
    </div>
  )
}

export default SearchBox
