const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try{
    const cookie= req.cookies;
      if(!cookie.token){
        throw new Error('Invalid token');
      }
    const decodedObj=jwt.verify(cookie.token, process.env.JWT_SECRET);      
    const user= await User.findById(decodedObj);

    if(!user){
      throw new Error('User not found');
    }
    req.user=user;
    next();
  }catch(err){
    res.status(401).json('ERROR:' + err.message);4
  }
};
const admin = (req, res, next) => {
  if (req.user && req.user.role==="admin") {
    next();
  } else {
    res.status(403).json({ ResponseData:null,ErrorMessage: 'Not authorized as admin' });
  }
};
module.exports = { protect,admin };
