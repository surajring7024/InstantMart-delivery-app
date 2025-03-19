const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({ResponseData:products,ErrorMessage:null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ResponseData:product,ErrorMessage:null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct= await productService.updateProduct(id,req.body);
    res.status(200).json({ResponseData:updatedProduct,ErrorMessage:null});
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
};

const deleteProduct=async (req,res)=>{
  const { id } = req.params;
  try {
     await productService.deleteProduct(id);
    res.status(200).json({ ResponseData: 'Order deleted successfully',ErrorMessage:null });
  } catch (err) {
    res.status(400).json({ ResponseData:null,ErrorMessage: err.message });
  }
}

module.exports = { getProducts, createProduct, updateProduct ,deleteProduct};
