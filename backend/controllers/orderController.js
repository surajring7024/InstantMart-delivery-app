const orderService = require('../services/orderService');

// Create new order
const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body);
    res.status(201).json({ResponseData:order,ErrorMessage: null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Get orders for logged-in user
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json({ResponseData:orders,ErrorMessage: null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user.id);
    res.status(200).json({ResponseData:order,ErrorMessage: null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res, next) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json({ResponseData:updatedOrder,ErrorMessage: null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

// Delete an order
const deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.status(200).json({ ResponseData: 'Order deleted successfully' ,ErrorMessage: null});
  } catch (error) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
