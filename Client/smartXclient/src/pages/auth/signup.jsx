import React, { use, useEffect } from 'react'
import LogoAnimation from '../../component/auth/logoAnimation.jsx'
import { Typography , TextField, Button} from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
const Signup = () => {
  // const [firstName,setfirstName]= useState("");
  // const changeHandler = (e)=>{
  //   setfirstName(e.target.value)
  // }
  // useEffect(()=>{
  //   console.log(firstName);
  // },[firstName])
  const [formData,setFormData]= useState({
    firstName:"",
    lastName:"",
    password:"",
    confirmPassword:"",
    email:""
  });
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  // console.log(formData)

  const changeHandler= (e)=>{
    setFormData(prev =>{
      return {
        ...prev,
        [e.target.name]:e.target.value,
      }
    })
  }
  const submitHandler = async (e)=>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error("Password and Confirm Password do not match");
      return;
    }
    if(formData.password.length <6){
      toast.error("Password should be at least 6 characters long");
      return;
    }

    const data ={
      email:formData.email,
    }
    const toastId = toast.loading("Creating Otp Please wait...");
    try {
      setLoading(true);
      const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);
      if(response.data.success === false){
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      navigate("/otp",{state:{data:formData}});
      toast.success(response.data.message);
      setLoading(false);


    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Error while creating otp");
      console.log("error while calling otp api ",error);
      setLoading(false);



    }// console.log("Form submit hua");
  }


useGSAP(()=>{
  const t1=gsap.timeline();

  t1.from(".fA1",{
    x:-200,
    opacity:0,
    duration:0.6,
  });

  t1.from(".iPf",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.3,
})


})

  return (
    <div className='flex pl-8 py-6 overflow-'>
      <div className='w-[50%] mt-2'>
        <Typography variant="h3" sx={{fontWeight:600}} color="secondary">
          Signup Page
        </Typography>
        <p className='mt-2 text-purple-300 '> Fill the form below to create your account </p>

        <div className='bg-white rounded-md w-[80%] p-4 mt-12 p-6 overflow-y-hidden fA1' >
        <form className="flex flex-col gap-8  " onSubmit={submitHandler} >

        <TextField type='text' 
        variant='filled'
        placeholder='Enter your first Name ' 
        label="First Name" 
        fullWidth 
        color="secondary"
        required
        onChange={changeHandler}
        name='firstName'
        className='iPf'
        />

        <TextField type='text' 
        variant='filled'
        placeholder='Enter your last Name ' 
        label="Last Name" 
        fullWidth 
        color="secondary"
        onChange={changeHandler}
        name='lastName'
        className='iPf'
        required/>

        <TextField type='email' 
        variant='filled'
        placeholder='Enter your Email ' 
        label="Email" 
        fullWidth 
        color="secondary"
        onChange={changeHandler}
        name='email'
        className='iPf'
        required/>

        <TextField type='password' 
        variant='filled'
        placeholder='Enter your Password ' 
        label="Password" 
        fullWidth 
        color="secondary"
        onChange={changeHandler}
        name='password'
        className='iPf'
        required/>

        <TextField type='password' 
        variant='filled'
        placeholder='Enter your Confirm Password ' 
        label=" Confirm Password" 
        fullWidth 
        color="secondary"
        onChange={changeHandler}
        name='confirmPassword'
        className='iPf'
        required/>


        <div className='flex items-center'>

      <Button variant="contained" 
      size="large" 
      color="secondary" 
      type="submit" 
      className='iPf'
      fullWidth>
        
         Sign Up
      </Button>
     {
      loading && <i className="fa fa-spinner fa-spin -ml-8"></i>
     }
        </div>


      </form>

      <p className='text-black justify-center mt-8 flex gap -2 text -[16px]  iPf'> Already have an account ? <span className='text-purple-700 ml-2'> Sign In</span></p>

        </div>


      </div>
      <div className='w-[50%] flex justify-center items-center '>
        <LogoAnimation/>
      </div>
    </div>
  )
}

export default Signup
