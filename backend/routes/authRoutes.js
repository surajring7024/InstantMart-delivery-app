const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile
} = require('../controllers/authController'); // Make sure the path is correct

const { protect } = require('../middlewares/authMiddleware'); // Make sure this is imported correctly

const router = express.Router();

// Register new user
router.post('/register', registerUser); // <-- This should match the function name in authController.js

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout', logoutUser);

// Get user profile
router.get('/profile', protect, getProfile);

module.exports = router;
