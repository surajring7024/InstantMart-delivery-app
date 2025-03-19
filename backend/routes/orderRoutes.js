const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder); // Create order
router.get('/', protect, getUserOrders); // Get user orders
router.get('/:id', protect, getOrderById); // Get order by ID
router.put('/:id/status', protect, updateOrderStatus); // Update order status
router.delete('/:id', protect, deleteOrder); // Delete order

module.exports = router;
