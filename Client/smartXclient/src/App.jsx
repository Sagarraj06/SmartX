import React from 'react'
import Login from './pages/auth/login.jsx'
import Signup from './pages/auth/signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './pages/auth/Otp.jsx'

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
