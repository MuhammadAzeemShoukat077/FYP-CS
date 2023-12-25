// resetPasswordRoutes.js
const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

//router.post("/resetPassword", resetPasswordController.resetPassword);
// resetPasswordRoutes.js
//router.get("/resetPassword/:token", resetPasswordController.resetPassword);
router.get("/resetPassword", resetPasswordController.resetPassword);


//router.post("/auth/resetPassword/:token", resetPasswordController.resetPassword);

module.exports = router;
