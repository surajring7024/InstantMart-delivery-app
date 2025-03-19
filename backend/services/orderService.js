const Order = require('../models/Order');
const Product = require('../models/Product');

// Create order
const createOrder = async (userId, data) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = data;

  if (orderItems.length === 0) {
    throw new Error('Order items cannot be empty');
  }

  // Validate products and quantity availability
  for (const item of orderItems) {
    const product = await Product.findById(item.product._id);
    item.price=product.price;
    if (!product) {
      throw new Error(`Product with ID ${item.product} not found`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Insufficient quantity for ${product.name}`);
    }

    product.quantity -= item.quantity;
    await product.save();
  }

  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    status: 'Pending',
  });

  await order.save();
  return order;
};

// Get user orders
const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).populate('orderItems.product');
  return orders;
};

// Get order by ID
const getOrderById = async (orderId, userId) => {
  const order = await Order.findById(orderId).populate('orderItems.product');

  if (!order) throw new Error('Order not found');
  if (order.user.toString() !== userId) throw new Error('Not authorized');

  return order;
};

// Update order status
const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  order.status = status;
  await order.save();

  return order;
};

// Delete an order
const deleteOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found');

  await order.deleteOne({_id:order._id});
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
