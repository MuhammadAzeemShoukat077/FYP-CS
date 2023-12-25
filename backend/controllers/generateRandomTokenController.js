// controllers/generateRandomTokenController.js
const User = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Generate a random token
const generateRandomToken = (length) => {
  const characters = "0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }
  return token;
};

// Controller to generate a random OTP and send it in an email
const generateRandomOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate a random OTP of length 6
    const otp = generateRandomToken(6);

    // Set resetToken (OTP) and resetTokenExpiry in the user model
    user.resetToken = otp;
    // Set OTP expiry (e.g., 5 minutes from now)
    user.resetTokenExpiry = Date.now() + 5 * 60 * 1000;

    // Save the user with the updated resetToken and resetTokenExpiry
    await user.save();

    // Send an email with the OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 587,
      auth: {
        user: process.env.EMAIL, // Replace with your email
        pass: process.env.EMAIL_PASSWORD, // Replace with your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL, // Replace with your email
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "OTP sent successfully for verification" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to verify the received OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the OTP matches and has not expired
    if (otp !== user.resetToken || Date.now() > user.resetTokenExpiry) {
      return res.status(401).json({ message: "Invalid OTP or OTP expired" });
    }

    // Clear the resetToken (OTP) and resetTokenExpiry in the user model
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "OTP verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { generateRandomOTP, verifyOTP };
