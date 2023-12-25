const express = require('express');
const userController = require('../controllers/userController');
//const authMiddleware = require('../middleware/authMiddleware');
const authMiddleware = require('../Middlerware/authMiddleware');


const router = express.Router();

// Protect routes with JWT authentication
router.use(authMiddleware);

router.get('/profile', userController.getProfile);

module.exports = router;
