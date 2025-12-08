
import React, { use, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import LogoAnimation from '../../component/auth/logoAnimation.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';




const ResetPassOtpVerify = () => {
    
    const location = useLocation();
    const userEmail= location.state;
    const [otp,setOtp] = useState('');
    const [loading,setLoading] = useState(false);
    const [otpLoading,setOtpLoading]= useState(false);
    const navigate= useNavigate();
   
    

    // verify Otp
    

    useGSAP(()=>{
      gsap.from(".otpAnimation",{
        x:-200,
        opacity:0,
        duration:0.6,
    })
    });

    const resendOtpHandler = async ()=>{
        // e.preventDefault();
        // console.log(email);
        const tostId = toast.loading("Sending OTP Please wait...");
        try {
            setLoading(true);
            const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`,{email:userEmail});
            if(!response?.data?.success){
                throw new Error(response?.data?.message || "Error occuring during sending otp for reset password");
            }
            toast.dismiss(tostId);
            // navigate('/resetPassOtpVerify',{state:email});
            toast.success(response?.data?.message || "OTP sent successfully to your email");
            setLoading(false);
            
        } catch (error) {
            toast.dismiss(tostId);
            
            setLoading(false);
            toast.error(error?.response?.data?.message || error?.message || "Error occuring during sending otp for reset password");
        }

    }

    const verifyOtpHandler = async (e)=>{
        if(otp.length !==4){
            toast.error("Please enter a valid 4 digit otp");
            return;
        }
        const toastId=toast.loading("Verifying Otp Please wait...");
        try {
            setOtpLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/forgotPasswordOtpVerify`,{email:userEmail,otp:otp});
            if(!response?.data?.success){
                throw new Error(response?.data?.message || "Error occuring during verifying otp for reset password");
            }
            toast.dismiss(toastId);
            toast.success(response?.data?.message || "Otp verified successfully");
            navigate('/resetPassword',{state:userEmail});
            setOtpLoading(false);
        } catch (error) {
            toast.dismiss(toastId);
            setOtpLoading(false);
            toast.error(error?.response?.data?.message || error?.message || "Error occuring during verifying otp for reset password");
            
        }
    }


  return (
    <div className='flex flex-row'>

        {//OTP JSX code
        }
         <div className='flex justify-center items-center h-[calc(100vh-80px)] w-[50%] ml-10 otpAnimation'>
        <div className='flex justify-center items-center flex-col gap-1'>
        <h2 className='font-semibold font-2xl'>We sent you a code</h2> 
        <p>Please enter it below to verify your email</p> 
        <p className='text-purple-400 text-xs'>
            {
                userEmail
            }
        </p>

        <div className='mt-6'>
            <OtpInput
            value={otp}
            onChange={setOtp}

            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props)=> <input {...props} className='w-20 h-12 text-4xl text-white bg-gray-600 border border-gray-400 rounded-md'/>
        }/>
        </div>
        <div className='w-full mt-6'>
            <Button variant="contained" 
            size="large" 
            color="secondary" 
            fullWidth
            onClick={verifyOtpHandler}
            disabled={otpLoading}>
            
            Verify Otp
            </Button>
            {
      otpLoading && <i className="fa fa-spinner fa-spin -ml-8"></i>
     }
        </div>
        <div>
            <p>Don,t get the code? <span className="underline cursor-pointer ml-2 " onClick={resendOtpHandler} > Resend code</span></p>
        </div>

            
    </div>
    </div>

    <div className='bg-purple-900  w-0.5'></div>
     {// LogoAnimation 
     }

     <div className='w-[50] flex items-center justify-center ml-20'>
        <LogoAnimation/>
     </div>




    </div>

   
  )
}


export default ResetPassOtpVerify;
