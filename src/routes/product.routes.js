const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/", verifyToken, productController.createProduct);
router.get("/", verifyToken, productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
