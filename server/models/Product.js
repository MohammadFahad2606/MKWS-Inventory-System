// server/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // jis user ne add kiya
      index: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 2,
      maxlength: 120,
      index: true,
    },
    productId: {
      type: String,
      required: [true, "Product ID is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    buyRate: {
      type: Number,
      required: [true, "Buy rate is required"],
      min: [0, "Buy rate must be >= 0"],
    },
    initialQuantity: {
      type: Number,
      required: [true, "Initial quantity is required"],
      min: [0, "Quantity must be >= 0"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    // optional future fields
    // sellRate: Number,
    // sku: String,
  },
  { timestamps: true }
);

// helpful compound index for search
productSchema.index({ name: "text", productId: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
