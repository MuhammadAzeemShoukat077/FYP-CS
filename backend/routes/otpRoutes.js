// otpRoutes.js
const express = require("express");
const generateRandomTokenController = require("../controllers/generateRandomTokenController");

const router = express.Router();

// Route to generate a random OTP and send it in an email
router.post("/generateOTP", generateRandomTokenController.generateRandomOTP);

// Route to verify the received OTP
router.post("/verifyOTP", generateRandomTokenController.verifyOTP);

module.exports = router;
