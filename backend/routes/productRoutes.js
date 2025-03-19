const express = require('express');
const { getProducts, createProduct,updateProduct,deleteProduct } = require('../controllers/productController');
const {protect, admin} = require("../middlewares/authMiddleware");
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
