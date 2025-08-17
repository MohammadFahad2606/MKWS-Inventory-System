import Product from "../models/Product.js";

// @desc    Create new product
// @route   POST /api/product
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const { name, productId, buyRate, initialQuantity, description } = req.body;

    if (!name || !productId || !buyRate || !initialQuantity) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const product = new Product({
      name,
      productId,
      buyRate,
      initialQuantity: initialQuantity,
      description,
      user: req.userId, // 👈 from middleware
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? { name: { $regex: search, $options: "i" }, user: req.userId }
      : { user: req.userId };

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/product/:id
// @access  Private
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/product/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, productId, buyRate, initialQuantity, description } = req.body;

    product.name = name || product.name;
    product.productId = productId || product.productId;
    product.buyRate = buyRate || product.buyRate;
    product.initialQuantity = initialQuantity ?? product.initialQuantity;
    product.description = description || product.description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
