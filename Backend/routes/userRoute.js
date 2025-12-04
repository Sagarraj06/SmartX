const express = require("express");
const router = express.Router();

const {createOpt, signUp, login, sendOtpforgotPassword,forgotPasswordOtpVerify,resetPassword}  = require("../controllers/authContoller.js");

router.post("/create-otp",createOpt);
router.post("/signup",signUp);

router.post("/login",login);
// expose both route names for password-reset OTP so older frontend paths don't 404
router.post("/sendOtpResetPassword",sendOtpforgotPassword);
router.post("/sendOtpforgotPassword",sendOtpforgotPassword);
router.post("/forgotPasswordOtpVerify",forgotPasswordOtpVerify);
router.put("/resetPassword",resetPassword);


module.exports = router;