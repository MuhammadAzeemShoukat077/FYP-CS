// authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const resetPasswordController = require("../controllers/resetPasswordController");
const sendResetEmailController = require("../controllers/sendResetEmailController");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/sendResetEmail", sendResetEmailController.sendResetEmail);
router.get("/restPassword", resetPasswordController.resetPassword);

module.exports = router;
