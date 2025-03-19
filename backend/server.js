const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form-encoded requests
app.use(cookieParser());
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running...' });
});

// Error handling middleware
app.use(errorHandler);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
