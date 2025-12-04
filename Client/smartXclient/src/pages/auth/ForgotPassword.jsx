import React from 'react'
import LogoAnimation from '../../component/auth/logoAnimation.jsx';
import { Typography,TextField, Input, Button} from '@mui/material';
import { CgMail } from "react-icons/cg";
import { InputAdornment } from '@mui/material';
import { use } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const [email,setEmail]= React.useState('');
    const [loading,setLoading]= React.useState(false);
    const navigate=useNavigate()

    useGSAP(()=>{
        const t1 = gsap.timeline();
        t1.from(".formAnimation",{
            x:-300,
            opacity:0,
            duration:0.6,
            delay:0.3,
        })
        t1.from(".formItem",{
            y:100,
            opacity:0,
            duration:0.3,
            stagger:0.2,
        },"-=0.2")
    })
    const submitHandler = async (e)=>{
        e.preventDefault();
        // console.log(email);
        const tostId = toast.loading("Sending OTP Please wait...");
        try {
            setLoading(true);
            const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`,{email});
            if(!response?.data?.success){
                throw new Error(response?.data?.message || "Error occuring during sending otp for reset password");
            }
            toast.dismiss(tostId);
            navigate('/resetPassOtpVerify',{state:email});
            toast.success(response?.data?.message || "OTP sent successfully to your email");
            setLoading(false);
            
        } catch (error) {
            toast.dismiss(tostId);
            
            setLoading(false);
            toast.error(error?.response?.data?.message || error?.message || "Error occuring during sending otp for reset password");
        }

    }
  return (
    <div className='flex flex-row px-24 py-6'>
       {/* forgot password form */}

       <div className='w-[50%] mt-16'>
        <Typography variant="h3" sx={{fontWeight:600}} >
          Forgot Password
        </Typography>
        <p className='mt-2 text-purple-300 text-[14px] '> Don't worry! It happens. Please enter the email address associated with your account. </p>
        
        
        <div className='bg-white rounded-md w-[80%] p-4 mt-20 p-6 overflow-y-hidden  formAnimation' >
            <form className=' flex flex-col gap-6 formItem ' onSubmit={submitHandler}>
            <TextField variant="filled" label="Email Address"
            type="email"
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
            
            placeholder='Enter your registered email address'
            required
            InputProps={{
                startAdornment:(
                    <InputAdornment position="start">
                        <CgMail size={20} className='text-gray-600'/>
                    </InputAdornment>
                )
            }}
            />
         <div className='flex items-center'>
               <Button variant="contained" size='large' className='formItem' type="submit"  disabled={loading} fullWidth color="secondary">
                Submit
                </Button>
            
            {
            loading && <i className="fa fa-spinner fa-spin -ml-8"></i>
            }
         </div>


             </form>

        </div>

       

       </div>

       {/* // logo animation */}
       <div className='w-[50%] h-[100vh] flex items-center justify-center -ml-14'>
        <LogoAnimation/>
       </div>
      
    </div>
  )
}

export default ForgotPassword
