import React from 'react'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './pages/auth/Otp.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassOtpVerify from './pages/auth/ResetPassOtpVerify.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Navbar from './component/Common/Navbar.jsx'
import Home from './pages/Home.jsx'
import {Toaster} from 'react-hot-toast';

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",element:<><Navbar/><Home/></>
    },
    {
      path:"/signup",element:<><Navbar/><Signup/></>
    },
    {
      path:"/otp",element:<><Navbar/><Otp/></>
    },
    {
      path:"/login",element:<><Navbar/><Login/></>

    },
    {
      path:"/ForgotPassword",element:<><Navbar/><ForgotPassword/></>
    },
    {
      path:"/resetPassOtpVerify",element:<><Navbar/><ResetPassOtpVerify/></>
    },
    {
      path:"/resetPassword",element:<><Navbar/><ResetPassword/></>
    }
  ])







  return (
  <div className='bg-[#0B0B0F] text-white h-screen w-screen overflow-x-hidden overflow-y-auto'>
    <RouterProvider router={router}> 
    
    </RouterProvider>
    <Toaster/>
  </div>
  )
}

export default App
