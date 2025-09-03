// routes/productRoutes.js (CommonJS)
const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  stockIn,
  stockOut,
  updateTransaction,
  deleteTransaction,
  deleteTransactionById,
  updateTransactionById,
} = require("../controllers/productController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// Protected Routes
router.post("/product", protect, createProduct);         // create product
router.get("/products", protect, getProducts);           // get all products
router.get("/product/:id", protect, getProductById);     // get single product
router.put("/product/:id", protect, updateProduct);      // update product
router.delete("/product/:id", protect, deleteProduct);   // delete product

// stock in / out routes
router.post("/product/:id/in", protect, stockIn);
router.post("/product/:id/out", protect, stockOut);

// updateTransaction  /  deleteTransaction routes
router.put("/product/:productId/transaction/:transactionId", protect, updateTransaction);
router.delete("/product/:productId/transaction/:transactionId", protect, deleteTransaction);
router.delete("/:transactionId", protect, deleteTransactionById);

// update transaction by ID
router.put("/transaction/:transactionId", protect, updateTransactionById);

module.exports = router;
