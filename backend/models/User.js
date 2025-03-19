const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt= require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

// Encrypt password before saving
userSchema.methods.validatePassword= async function(passwordByUser){
  const user= this;
  const passwordHash= user.password;

  const isValid= await bcrypt.compare(passwordByUser,passwordHash);

  return isValid;
}
userSchema.methods.getJwtToken= async function(){
  const user= this;

  const token= await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
  return token;  
}
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model('User', userSchema);
