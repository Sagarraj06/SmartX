import React from 'react'
import SearchBox from '../Navbar/SearchBox'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";




const Navbar = () => {
    const {userData} = useSelector((state)=>state.user);
    const {token} = useSelector((state)=> state.auth);

    console.log("UserData in Navbar:", userData);
    console.log("Token in Navbar:", token);

    return (
    <div className=''>
        <header className='bg-purple-900 px-3 py-2 flex items-center gap-6 justify-center'>
            <Link to={"/"}>
            <h2 className='flex items-center font-bold text-4xl'>
                <p>Smart</p> 
                <span className='text-6xl text-yellow-400'>X</span>
            </h2></Link>
            <SearchBox />
            <nav className=' flex items-center gap-4 font-semibold'>
                <Link to={"#"}> About Us</Link>
                <Link to={"#"}>Contact Us</Link>

                {token?(<div className='flex items-center gap-1 cursor-pointer'>
                    <img src={userData?.profilePicture} alt="UserProfilePicture" className='h-10 w-10 rounded-full object-cover' /> <IoIosArrowDown size={30}/>
                </div> ):( <div className=' flex items-center gap-4'>
                    <Link to={"/login"} className='bg-purple-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-purple-800'>Login</Link>
                    <Link to={"/signup"} className='bg-purple-600 px-4 py-2 rounded-md transition-all duration-300 hover:bg-purple-800'>Sign Up</Link>
                </div>)}

               
                 

                <FaRegHeart size={30} className='cursor-pointer' />


                <div className='flex item-center gap-1 bg-purple-600 rounded-full px-4 py-2 cursor-pointer ransition-all duration-300 hover:bg-purple-800'>
                    <FaPlus size={25} />
                    <p className='font-semibold text-[18px]'>SELL</p>

                </div>

            </nav>
        </header>

        
      
    </div>
  )
}

export default Navbar
