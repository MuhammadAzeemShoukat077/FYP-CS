// controllers/sendResetEmailController.js
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");
require("dotenv").config();

const sendResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.RESET_SECRET_KEY,
      {
        expiresIn: "1h", // Set your desired expiration time
      }
    );

    // Save the reset token to the user model (optional)
    user.resetToken = resetToken;
    await user.save();

    // Send the reset token in an email
const resetLink = `http://192.168.1.18:3000/auth/resetPassword?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email, 
      subject: "Password Reset",
      html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: "Failed to send reset email",
        });
      }

      console.log("Email sent: " + info.response);
      return res.status(200).json({
        message: "Reset email sent successfully",
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { sendResetEmail };
