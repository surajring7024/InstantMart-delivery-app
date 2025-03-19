const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: String,
  quantity: Number,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
