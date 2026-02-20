import { InputAdornment, Typography } from '@mui/material'
import React from 'react'
import LogoAnimation from '../../component/auth/logoAnimation.jsx';
import { TextField,Button } from '@mui/material';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword,setNewPassword]= React.useState(true);
  const [confirmPassword,setConfirmPassword]= React.useState(true);
  const [formData,setFormData]= React.useState({
    password:"",
    confirmPassword:"",
  })
  const location = useLocation();
  const email= location.state;
  const [loading,setLoading]= React.useState(false);
  const navigate = useNavigate();

  const submitHandler= async (e)=>{
    e.preventDefault();
    formData.email= email;
    if(formData.password !== formData.confirmPassword){
      toast.error("Password and Confirm Password do not match");
      return;
    }
    if(formData.password.length <6){
      toast.error("Password should be at least 6 characters long");
      return;
    }
    const tostId = toast.loading("Resetting Password Please wait...");

    try {
    setLoading(true);
    const response= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/resetPassword`,formData);
    if(!response?.data?.success){
      throw new Error(response?.data?.message || "Error occuring during resetting password"); 
    }
    toast.dismiss(tostId);
    toast.success(response?.data?.message || "Password reset successfully");
    setLoading(false);
    navigate('/login');

    } catch (error) {
      toast.dismiss(tostId);
      setLoading(false);
      toast.error(error?.response?.data?.message || error?.message || "Error occuring during resetting password");
    }
  }
  const onChangeHandler=(e)=>{
    const {name,value}= e.target;
    setFormData(prev=>{
      return {
        ...prev,
        [name]:value,
      }
    })
  }

  useGSAP(()=>{
    const t1=gsap.timeline();
    t1.from(".resetFormAnimation",{
      x:-300,
      opacity:0,
      duration:0.6,
      delay:0.3,
    })
    t1.from(".iPf",{
      y:100,
      opacity:0,
      duration:0.3,
    },"-=0.2")
  });
  return (
    <div className='flex px-24 py-6 w-screen ' >
      <div className='w -[50%] mt-24'>
        <div>
          <Typography variant='h3' sx={{fontWeight:700}}>
        Change your Password
      </Typography>
      <p className='mt-2 text-purple-300 '> Enter your new password below </p>
        </div>

        {/* reset password form */}

        <div className=' bg-white w-[80%] rounded-md mt-24 p-6 resetFormAnimation'>
          <form className='flex flex-col gap-6'onSubmit={submitHandler} >
          <TextField 
          className="iPf" 
          type={newPassword ? "password" : "text"} 
          variant='filled' 
          placeholder='Enter your new password' 
          label="New Password" 
          required
          InputProps={{
            endAdornment:(
              <InputAdornment position='end'>
                {
                  newPassword ? <BsEyeSlashFill size={25} className='cursor-pointer' onClick={()=>{setNewPassword(false)}}/> :
                  <IoEyeSharp size={25} className='cursor-pointer' onClick={()=>{setNewPassword(true)}}/>
                }
              </InputAdornment>
            )
          }}
          name='password'
          value={formData.Password}
          onChange={onChangeHandler}
          />
             
           
          <TextField 
          variant='filled' 
          type={confirmPassword ? "password" : "text"} 
          className="iPf" 
          placeholder='Enter your confirm Password' 
          label="Confirm Password" 
          required
           InputProps={{
            endAdornment:(
              <InputAdornment position='end'>
                {
                  confirmPassword ? <BsEyeSlashFill size={25} className='cursor-pointer' onClick={()=>{setConfirmPassword(false)}}/> :
                  <IoEyeSharp size={25} className='cursor-pointer' onClick={()=>{setConfirmPassword(true)}}/>
                }
              </InputAdornment>
            )
          }}
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={onChangeHandler}
          ></TextField>

          <div className='flex items-center'>
            <Button variant="contained" 
            disabled={loading}
                className="iPf"
                size="large" 
                color="secondary" 
                type="submit" 
                fullWidth
                // disabled={loading}
                sx={{textTransform:"none"}}
                
                >
                  
                   Sign Up
                </Button>
                {
                  loading && <i className="fa fa-spinner fa-spin -ml-8"></i>
                }
          </div>
               
        </form>
        </div>
        
      </div>



      <div className='w-[50%] flex items-center  justify-center'>
        <LogoAnimation/>
      </div>
      
    </div>
  )
}

export default ResetPassword
