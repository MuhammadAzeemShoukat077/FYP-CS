// controllers/resetPasswordController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Decode the reset token to get the user ID
    const decodedToken = jwt.verify(resetToken, process.env.RESET_SECRET_KEY);
    const userId = decodedToken.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the token has expired
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({
        message: "Reset token has expired",
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = undefined;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Reset token has expired",
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}; 

module.exports = { resetPassword };
