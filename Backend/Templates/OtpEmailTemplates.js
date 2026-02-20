// exports.otpEmailTemplate = (otp) => {
    
// return `
//     <!doctype html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <title>Smartx OTP</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
// </head>
// <body style="margin:0; padding:0; background-color:#f2f4f7; font-family:Helvetica, Arial, sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;">
//     <tr>
//       <td align="center" style="padding:24px;">
        
//         <table width="600" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

//           <!-- Header -->
//           <tr>
//             <td style="padding:20px;background:#0b61ff;color:#fff;font-size:20px;font-weight:700;">
//               Smartx Verification
//             </td>
//           </tr>

//           <!-- Body -->
//           <tr>
//             <td style="padding:28px 24px;font-size:14px;color:#0f172a;">
              
//               <h2 style="margin-top:0;font-size:20px;font-weight:700;">Your Smartx OTP</h2>
//               <p style="color:#475569;line-height:1.5;">
//                 Use the one-time password ${otp} below to verify your Smartx account.  
//                 This OTP is valid for <strong>5 minutes</strong>.  
//                 If you didn't request this, please ignore the email.
//               </p>

//               <!-- OTP Box -->
//               <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 22px 0;">
//                 <tr>
//                   <td align="center">
//                     <div style="display:inline-block;padding:18px 28px;border-radius:8px;background:#0f172a;color:#fff;font-size:28px;letter-spacing:4px;font-weight:700;">
//                       {OTP}
//                     </div>
//                   </td>
//                 </tr>
//               </table>

//               <p style="color:#64748b;font-size:13px;">
//                 Do not share this code with anyone for security reasons.
//               </p>

//             </td>
//           </tr>

//           <!-- Divider -->
//           <tr>
//             <td style="padding:0 24px;">
//               <hr style="border:none;border-top:1px solid #eef2f7;margin:0;">
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td style="padding:16px 24px 24px;font-size:13px;color:#64748b;">
//               <strong>Smartx</strong><br>
//               Founded by <b>Sagar Raj</b><br>
//               Contact us: 
//               <a href="mailto:sr8936050368@gmail.com" style="color:#0b61ff;text-decoration:none;">
//                 sr8936050368@gmail.com
//               </a>
//               <br><br>
//               © <span id="year">{YEAR}</span> Smartx — All rights reserved.
//               <p style="font-size:12px;color:#94a3b8;margin-top:8px;">
//                 This OTP will expire in <strong>5 minutes</strong>.
//               </p>
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>
// </body>
// </html>
//     `
// }

exports.otpEmailTemplate = (otp) => {
return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Smartx OTP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f7; font-family:Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;">
    <tr>
      <td align="center" style="padding:24px;">
        
        <table width="600" style="max-width:600px;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">

          <!-- Header -->
          <tr>
            <td style="padding:20px;background:#0b61ff;color:#fff;font-size:20px;font-weight:700;">
              Smartx Verification
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 24px;font-size:14px;color:#0f172a;">
              
              <h2 style="margin-top:0;font-size:20px;font-weight:700;">Your Smartx OTP</h2>
              <p style="color:#475569;line-height:1.5;">
                Use the one-time password <b>${otp}</b> below to verify your Smartx account.  
                This OTP is valid for <strong>5 minutes</strong>.  
                If you didn't request this, please ignore the email.
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 22px 0;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;padding:18px 28px;border-radius:8px;background:#0f172a;color:#fff;font-size:28px;letter-spacing:4px;font-weight:700;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="color:#64748b;font-size:13px;">
                Do not share this code with anyone for security reasons.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 24px;">
              <hr style="border:none;border-top:1px solid #eef2f7;margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px 24px;font-size:13px;color:#64748b;">
              <strong>Smartx</strong><br>
              Founded by <b>Sagar Raj</b><br>
              Contact us: 
              <a href="mailto:sr8936050368@gmail.com" style="color:#0b61ff;text-decoration:none;">
                sr8936050368@gmail.com
              </a>
              <br><br>
              © ${new Date().getFullYear()} Smartx — All rights reserved.
              <p style="font-size:12px;color:#94a3b8;margin-top:8px;">
                This OTP will expire in <strong>5 minutes</strong>.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`
};
