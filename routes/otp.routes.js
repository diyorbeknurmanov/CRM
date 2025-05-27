const { newOtp, verifyOtp } = require("../controllers/otp.controller");

const otp_router = require("express").Router();

otp_router.post("/new", newOtp);
otp_router.post("/verifay", verifyOtp);

module.exports = otp_router;
