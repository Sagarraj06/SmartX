// const nodemailer= require('nodemailer');

// exports.sendMail= async(email,subject,body)=>{
//     try {
//         const transporter= nodemailer.createTransport({
//             host:process.env.HOST,
//             auth:{
//                 user:process.env.USER,
//                 pass:process.env.PASS,
//             }
//         });
        
//         const info= transporter.sendMail({
//             from:"SmartX",
//             to:email,
//             subject:subject,
//             html:body
//         })
//         return info;
//     } catch (error) {
//         console.log("error while sending mail",error);
        
//     }
// }

const nodemailer = require("nodemailer");

exports.sendMail = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,   
      port: 587,                    
    //   secure: false,              
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });

    const info = await transporter.sendMail({
      from: `"SmartX" <${process.env.MAIL_USER}>`,
      to: email,
      subject: subject,
      html: body,
    });

    return info;

  } catch (error) {
    console.log("❌ Error while sending mail:", error);
  }
};
