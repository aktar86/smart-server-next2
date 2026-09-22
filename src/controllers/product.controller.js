const productService = require("../services/product.service");

exports.createProduct = async (req, res) => {
  console.log("inside the post data backend:", req.headers);

  const newProduct = req.body;

  // Check empty body
  if (!newProduct || Object.keys(newProduct).length === 0) {
    return res.status(400).send({
      success: false,
      message: "Product data is required",
    });
  }

  // Add extra information
  newProduct.createdAt = new Date().toISOString();
  newProduct.product_status = "Pending";

  // Send product data to service
  const result = await productService.createProduct(newProduct);

  res.send(result);
};

exports.getAllProducts = async (req, res) => {
  const result = await productService.getAllProducts();
  res.send(result);
};

exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;

  const result = await productService.getSingleProduct(id);
  res.send(result);
};

exports.updateProduct = async (req, res) => {
  const result = await productService.updateProduct(req.params.id, req.body);
  res.send(result);
};

exports.deleteProduct = async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  res.send(result);
};
