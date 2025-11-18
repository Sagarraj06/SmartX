import React, { use, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Button } from '@mui/material';



const Otp = () => {
    const location = useLocation();
    const data = location.state.data;
    const [otp,setOtp] = useState('');
    console.log(data);
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <div className='flex justify-center items-center flex-col gap-1'>
        <h2 className='font-semibold font-2xl'>We sent you a code</h2> 
        <p>Please enter it below to verify your email</p> 
        <p className='text-purple-400 text-xs'>
            {
                data.email
            }
        </p>

        <div className='mt-6'>
            <OtpInput
            value={otp}
            onChange={setOtp}

            numInputs={4}
            renderSeparator={<spam>-</spam>}
            renderInput={(props)=> <input {...props} className='w-20 h-12 text-4xl text-white bg-gray-600 border border-gray-400 rounded-md'/>
        }/>
        </div>
        <div className='w-full mt-6'>
            <Button variant="contained" 
            size="large" 
            color="secondary" 
            fullWidth>
            Verify Otp
            </Button>
        </div>
        <div>
            <p>Don,t get the code? <span className="underline cursor-pointer ml-2"> Resend code</span></p>
        </div>

            
    </div>
    </div>
  )
}

export default Otp
