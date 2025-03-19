const Product = require('../models/Product');

const getAllProducts = async (query) => {
  const products = await Product.find().limit(20);
  return products;
};

const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

const updateProduct= async (id,data)=>{
  const product = await Product.findById(id);

    if (!product) {
      throw new Error("Invalid Product ID");
    }
        
    product.name = data.name || product.name;
    product.description = data.description || product.description;
    product.price = data.price || product.price;
    product.category = data.category || product.category;
    product.stock = data.stock || product.stock;
    product.imageUrl = data.imageUrl || product.imageUrl;

    const updatedProduct = await product.save();

    return updatedProduct;
}

const deleteProduct= async(id)=>{
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Invalid Product ID");
  }
  await product.deleteOne({_id:id});
}

module.exports = { getAllProducts, createProduct ,updateProduct,deleteProduct};
