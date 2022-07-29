const express = require('express');
const userController = require('../controller/userController');
const {protect }  = require('../controller/authController');
const router = express.Router();

router.get('/me', userController.getMe);
router.get('/theme', protect, userController.myTheme);

router.patch('/', protect, protect, userController.updateTheme);


module.exports = router;