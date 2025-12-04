import React from 'react'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './pages/auth/Otp.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassOtpVerify from './pages/auth/ResetPassOtpVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",element:<Signup/>
    },
    {
      path:"/otp",element:<Otp/>
    },
    {
      path:"/login",element:<Login/>

    },
    {
      path:"/ForgotPassword",element:<ForgotPassword/>
    },
    {
      path:"/resetPassOtpVerify",element:<ResetPassOtpVerify/>
    },
    {
      path:"/resetPassword",element:<ResetPassword/>
    }
  ])







  return (
  <div className='bg-[#0B0B0F] text-white h-screen w-screen overflow-x-hidden overflow-y-auto'>
    <RouterProvider router={router}> 
    
    </RouterProvider>
  </div>
  )
}

export default App
