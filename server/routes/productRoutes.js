import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.post("/product", protect, createProduct);         // create product
router.get("/products", protect, getProducts);           // get all products
router.get("/product/:id", protect, getProductById);     // get single product
router.put("/product/:id", protect, updateProduct);      // update product
router.delete("/product/:id", protect, deleteProduct);   // delete product

export default router;
