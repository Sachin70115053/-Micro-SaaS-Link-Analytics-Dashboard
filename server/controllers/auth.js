// server/controllers/auth.js
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedToken();
    
    res.status(statusCode).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  };
  
  exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
  
    sendTokenResponse(user, 200, res);
  });


exports.register = asyncHandler(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      console.log('Registration attempt:', { name, email, password });
  
      if (!name || !email || !password) {
        console.log('Missing fields');
        return next(new ErrorResponse('Please provide all required fields', 400));
      }
  
      const existingUser = await User.findOne({ email });
      console.log('Existing user check:', existingUser);
      
      if (existingUser) {
        return next(new ErrorResponse('User already exists', 400));
      }
  
      const user = await User.create({ name, email, password });
      console.log('User created:', user);
      
      sendTokenResponse(user, 201, res);
    } catch (error) {
      console.error('Registration error:', error);
      next(new ErrorResponse('Registration failed', 500));
    }
  });

exports.getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    
    // Add cache-control headers
    res.set('Cache-Control', 'no-store, max-age=0');
    
    res.status(200).json({
      success: true,
      data: user
    });
  });