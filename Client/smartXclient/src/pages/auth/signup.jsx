import React from 'react'
import LogoAnimation from '../../component/auth/logoAnimation.jsx'
import { Typography } from '@mui/material'
const Signup = () => {
  return (
    <div className='flex pl-8'>
      <div className='w-[50%] mt-8'>
        <Typography variant="h3" sx={{fontWeight:700}} >
          Signup Page
        </Typography>
        <p> Fill the form below to create your account </p>
      </div>
      <div className='w-[50%] border'>
        <LogoAnimation/>
      </div>
    </div>
  )
}

export default Signup
