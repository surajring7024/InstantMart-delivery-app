const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register User
const register = async (data) => {

  const { name, email, password } = data;
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  
  const user = new User({
    name:name, 
    email:email,
    password: hashPassword,
  });
  
  await user.save();
  return user;
};

// Login User
const login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email:email });

  if (!user) throw new Error('Invalid credentials');
  
  const isPasswordValid= await user.validatePassword(password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = await user.getJwtToken();
  
  return { token, user };
};

// Get User Profile
const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');

  return user;
};

module.exports = {
  register,
  login,
  getProfile,
};
