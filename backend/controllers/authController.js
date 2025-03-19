const User = require('../models/User');

const {register,login} = require('../services/authService');
// Register User
const registerUser = async (req, res) => {
  try{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please fill all fields');
    }

    const user= await register(req.body);
  
    if (user){
      res.status(201).json({
        ResponseData:{
        _id: user._id,
        name: user.name,
        email: user.email
        },ErrorMessage: null
      });
    }
  }catch(err){
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;

    if(!email || !password) {
      throw new Error('Please provide email and password');
    }

    const {token,user}= await login(req.body);

    res.cookie("token", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    if (user) {
      res.json({
        ResponseData:{
          _id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } 
  }
  catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  });
  res.status(200).json({ ResponseData: 'Logged out successfully',ErrorMessage:null });
};

// Get Profile
const getProfile = async (req, res) => {
  try{
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        ResponseData:{
          _id: user.id,
          name: user.name,
          email: user.email
        },ErrorMessage: null
      });
    }else{
      throw new Error("User Not Found");
    }
  }
  catch(err){
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
  
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getProfile
};
