import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../component/auth/logoAnimation.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/auth.js';
import { setUserData } from '../../redux/slices/userData.js';


const Login = () => {

  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useGSAP(()=>{

    const t1 = gsap.timeline();
    t1.from(".loginAnimation",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    });

    t1.from(".inputAnimation",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
    },"-=0.9")
  });

  const onChangeHandler = (event)=>{
    const {name,value} = event.target;

    setFormData(prev =>{
     return {
      ...prev,
      [name]:value
     }
    })
  }


  const submitHandler =async(e)=>{
    e.preventDefault();

    const tostId = toast.loading("login...");
    try {
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,formData);

      if(!response?.data?.success){
        throw new Error("Error occur during login");
      }
      // console.log(response.data);

      toast.dismiss(tostId);
      dispatch(setToken(response?.data?.token));
      dispatch(setUserData(response?.data?.userDetails));
      navigate("/");
      toast.success(response?.data?.message);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(tostId);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
  return (
    <div className='flex px-24 overflow-y-hidden'>

      <div className='w-[50%]  '>
           <Typography variant="h3" color="secondary" sx={{fontWeight:600, marginTop:10}} >
                 Welcome!
               </Typography>
                <p className='text-[14px] text-purple-300 mt-2'>Login to <span className='text-white'>Smart</span><span className='text-yellow-400 font-semibold text-[16px]'>X</span> to continue to <span className='text-white' >Smart</span><span className='text-yellow-400 font-semibold text-[16px]'>X</span></p>



                {/* login form  */}
                <div className='w-[80%] bg-white rounded-md mt-24 p-6 overflow-y-hidden loginAnimation' >
                  <form className='flex flex-col gap-6' onSubmit={submitHandler}>
                    <TextField 
                    type="email"
                    variant="filled"
                   placeholder='Your email address'
                    label="Email" 
                   fullWidth
                    required
                    color="secondary"
                    className='inputAnimation'
                    name="email"
                    onChange={onChangeHandler}
                    />

                 <div className='flex flex-col'>
                     <TextField 
                     type={
                      showPassword ? "text" : "password"
                     }
                     name="password"
                     variant="filled"
                    placeholder='Your password'
                    label="Password"
                    required
                    fullWidth
                    color="secondary"
                    onChange={onChangeHandler}
                    className='inputAnimation'
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position="end">
                          {
                            showPassword ? <IoEyeSharp size={25} className='cursor-pointer'
                            onClick={()=>{setShowPassword(false)}}/> :
                             <BsFillEyeSlashFill size={25} className='cursor-pointer' 
                             onClick={()=>{setShowPassword(true)}}/>
                          }
                        </InputAdornment>
                      )
                    }}
                    />
                    <Link to={"/ForgotPassword"} className=' inputAnimation text-[14px] text-purple-600 self-end'>
                    Forgot password?
                    </Link>
                 </div>

         <div>
                  <Button
                  variant="contained"
                     size="large"
                     fullWidth
                     type="submit"
                     color="secondary"
                     className='inputAnimation'
                     sx={{textTransform:"none"}}
                     disabled={loading}
                  >
                  Log In
                 </Button>
                   {
            loading &&  <i className="fa-solid  fa-spinner animate-spin -ml-8"></i>
           }
         </div>
                  
                  </form>

              <p className='text-black mt-6 flex justify-center gap-2 text-[16px] inputAnimation'>
            Don't have an account?
             <span className='text-purple-600 cursor-pointer' 
             onClick={()=>{navigate("/signup")}}>Sign Up</span>
              </p>
                </div>
      </div>


        {/* logo animation  */}
      <div className='w-[50%]  flex items-center justify-center mt-32'>
        <LogoAnimation/>
      </div>

   

    </div>
  )
}

export default Login