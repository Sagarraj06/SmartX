import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import LogoAnimation from '../../component/auth/logoAnimation.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';




const Otp = () => {
    const location = useLocation();
    const formData = location?.state?.data;
    const [otp,setOtp] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    

    // resend OTP
     const resendOtpHandler = async ()=>{
    
    const data ={
      email:formData.email,
    }
    const toastId = toast.loading("Creating Otp Please wait...");
    try {
    
      const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);
      if(response.data.success === false){
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success(response.data.message);


    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Error while creating otp");
      console.log("error while calling otp api ",error);



      }
  }

    // verify Otp
    const verifyOtpHandler = async (e)=>{
        if(otp.length !==4){
            toast.error("Please enter a valid 4 digit otp");
            return;
        }
        formData.otp= otp;
        const toastId=toast.loading("Verifying Otp Please wait...");

        try {
            setLoading(true);
            const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,formData);
            if(response.data.success === false){
              throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            toast.success(response.data.message);
            setLoading(false);
            navigate("/login");

            
        } catch (error) {
            console.log("error while verifying otp ",error);
            toast.dismiss(toastId); 
            toast.error(error.response?.data?.message || "Error while verifying otp");
            setLoading(false);
            
        }
    }

    useGSAP(()=>{
      gsap.from(".otpAnimation",{
        x:-200,
        opacity:0,
        duration:0.6,
    })
    });


  return (
    <div className='flex flex-row'>

        {//OTP JSX code
        }
         <div className='flex justify-center items-center h-[100vh] w-[50%] ml-10 otpAnimation'>
        <div className='flex justify-center items-center flex-col gap-1'>
        <h2 className='font-semibold font-2xl'>We sent you a code</h2> 
        <p>Please enter it below to verify your email</p> 
        <p className='text-purple-400 text-xs'>
            {
                formData.email
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
            disabled={loading}>
            
            Verify Otp
            </Button>
            {
      loading && <i className="fa fa-spinner fa-spin -ml-8"></i>
     }
        </div>
        <div>
            <p>Don,t get the code? <span className="underline cursor-pointer ml-2 " onClick={resendOtpHandler}> Resend code</span></p>
        </div>

            
    </div>
    </div>

    <div className='bg-purple-900 h-[100vh] w-0.5'></div>
     {// LogoAnimation 
     }

     <div className='w-[50] flex items-center justify-center ml-20'>
        <LogoAnimation/>
     </div>




    </div>

   
  )
}

export default Otp
