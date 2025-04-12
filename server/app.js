// server/app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');

const app = express();
require('dotenv').config();
app.use(cookieParser());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRoutes);

// Error Handler (should be last middleware)
app.use(errorHandler);

module.exports = app;