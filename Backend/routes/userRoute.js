const express = require("express");
const router = express.Router();

const {createOpt, signUp, login, }  = require("../controllers/authContoller");

router.post("/create-otp",createOpt);
router.post("/signup",signUp);

router.get("/login",login);


module.exports = router;