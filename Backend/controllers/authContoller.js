const OTP = require("../models/otp");
const User = require("../models/user");
const otpGenerator = require("otp-generator");
const becrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");




// create and send otp
exports.createOpt = async(req,res)=>{
  try {

    // fetch email
    const {email} = req.body;

    // validation 
    if(!email){
        return res.status(400).json({
            success:false,
            message:"please fill all the input fileds",
        });
    }

    // check is user allready have an account
    const userDetails = await User.findOne({email:email});

    if(userDetails){
        return res.status(400).json({
            success:false,
            message:"User allready have an account",
        })
    }
     
    // generate otp
  const newOtp = otpGenerator.generate(4,{
    specialChars:false,
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
  });

    // create entry in db
    const newOpt = await OTP.create({
        email:email,
        otp:newOtp,
    });


    // return response
    return res.status(200).json({
        success:true,
        message:"Otp created successfully",
        newOpt,      
    });

  
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Setver error",
       })
        
    }

}


// sign up
exports.signUp = async(req,res)=>{
 try {
    const {firstName,lastName,email,password,confirmPassword,otp} = req.body;
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(400).json({
            success:false,
            message:"Please fill all the input fields",
        });
    }
    if(password !==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirm password do not match",
        });
    }
    const userExists= await User.find({email:email});
    console.log(userExists);
    if(userExists.length >0){
        return res.status(400).json({
            success:false,
            message:"User allready exists, please login",
        })
    }
    // verify latest otp
    // const latestotp = (await OTP.findOne({email:email})).sort({createdAt:-1}).limit(1);
    // console.log(latestotp);
const latestOtp = await OTP.find({ email })
  .sort({ createdAt: -1 })
  .limit(1);

console.log(latestOtp);
if(latestOtp.length ===0){
    return res.status(400).json({
        success:false,
        message:"Invalid OTP"
    })
}
// console.log("✅ OTP from request:", otp);
// console.log("✅ OTP from DB:", latestOtp[0].otp);
// console.log("✅ Type check:", typeof otp, typeof latestOtp[0].otp);

if(String(otp) !==String(latestOtp[0].otp)){
    return res.status(400).json({
        success:false,
        message:"Otp not matched",
    })
}

console.log(password)
//hash password
const hashedPassword = await becrypt.hash(password,10);
// console.log(hashedPassword);

// create profilePicture 
const profilePicture= `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`;

console.log(profilePicture);

const newUser= await User.create({
    firstName:firstName,
    lastName:lastName,
    email:email,
    password:hashedPassword,
    profilePicture:profilePicture,

})

console.log(newUser)
return res.status(200).json({
    success:true,
    message:"User registered successfully",
    newUser,
})

 } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal Server error",
    });
    
 }

}

//login
exports.login = async(req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the input fields",
            });
        }
        // check emial registered or not
        const userDetails = await User.findOne({email:email});
        if(!userDetails){
            return res.status(400).json({ 
                success:false,
                message:"User not found, please signup",
     });

        }
console.log(userDetails);
const isMatched = await becrypt.compare(password,userDetails.password);
if(isMatched){
        const payload={
            userId:userDetails._id,
            userEmail:userDetails.email,
        }


    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        expiresIn:"2h"
    });
    // console.log(token);
    userDetails.password=undefined;

    
    
    
    return res.status(200).json({
        success:true,
        message:"Login successful",
        userDetails:userDetails,
        token:token,
    });
}
else{
    return res.status(400).json({
        success:false,
        message:"Invalid credentials",
    });
}
            


       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error",
        });
        
    }
    
}


// send otp for password reset
exports.sendOtpforgotPassword= async(req,res)=>{
  try {

    // fetch email
    const {email} = req.body;

    // validation 
    if(!email){
        return res.status(400).json({
            success:false,
            message:"please fill all the input fileds",
        });
    }

    // check is user allready have an account
    const userDetails = await User.findOne({email:email});

    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"User not found with this email",
        })
    }
     
    // generate otp
  const newOtp = otpGenerator.generate(4,{
    specialChars:false,
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
  });

    // create entry in db
    const newOpt = await OTP.create({
        email:email,
        otp:newOtp,
    });


    // return response
    return res.status(200).json({
        success:true,
        message:"Otp created successfully",
        newOpt,      
    });

  
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Setver error",
       })
        
    }

}



// verify otp for password reset
exports.forgotPasswordOtpVerify= async(req,res)=>{
  try {
    const {email,otp}= req.body;
    if(!otp){
        return res.status(400).json({
            success:false,
            message:"Please provide otp",
        });

    if(!email){
        return res.status(400).json({
            success:false,
            message:"Please provide email",
        });
    }
}
    const latestOtp = await OTP.find({ email:email })
    .sort({ createdAt: -1 })
    .limit(1);  

    if(!latestOtp){
        return res.status(400).json({
            success:false,
            message:"OTP EXPIRED"
        })
    }
    if(latestOtp.length ===0){
        return res.status(400).json({
            success:false,
            message:"Invalid OTP"
        })
    }
    if(String(otp) !==String(latestOtp[0].otp)){
        return res.status(400).json({
            success:false,
            message:"Otp not matched",
        })
    }
    // const hashedPassword = await becrypt.hash(newPassword,10);
    // await User.updateOne({email:email},{
    //     $set:{
    //         password:hashedPassword,    
    //     }
    // });
    return res.status(200).json({
        success:true,
        message:"OTP matched successfully, you can reset your password now",
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error",
        });

    }
}  

exports.resetPassword= async(req,res)=>{
    try {
        const {password, confirmPassword,email}= req.body;

        if(!password || !confirmPassword || !email){
            return res.status(400).json({
                success:false,
                message:"Please provide all the input fields",
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password do not match",
            });
        }
        const hashedPassword = await becrypt.hash(password,10);
        const updateUser= await User.findOneAndUpdate({email:email},{
            password:hashedPassword
        },
            {
                new:true,
            }
        );

        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
            // updateUser,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server error",
        });
        
    }


}