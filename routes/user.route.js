const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authenticate } = require('../middleware/auth.middleware.js');


// Get user profile
router.get('/user/profile', authenticate, profileController.getProfile);

// Update user profile
router.put('/user/profile', authenticate, profileController.updateProfile);

module.exports = router;
