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
      transactions: [
        {
          type: "IN",
          amount: initialQuantity,
          remark: "Initial stock",
          date: new Date(),
        },
      ],
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
    // initialQuantity remove from req.body
    const { name, productId, buyRate,  description } = req.body;

    product.name = name || product.name;
    product.productId = productId || product.productId;
    product.buyRate = buyRate || product.buyRate;
    // product.initialQuantity = initialQuantity ?? product.initialQuantity;
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
// @desc    Stock In (Increase Quantity)
// @route   POST /api/product/:id/in
// @access  Private
export const stockIn = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, date, remark } = req.body;
    const amount = quantity; // rename quantity -> amount

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount is required and must be greater than 0" });
    }

    const product = await Product.findOne({ _id: id, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.initialQuantity += amount;

    // transaction history array bana lo (future reporting ke liye)
    if (!product.transactions) product.transactions = [];
    product.transactions.push({
      type: "IN",
      amount,
      date: date || new Date(),
      remark: remark || "",
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Stock Out (Decrease Quantity)
// @route   POST /api/product/:id/out
// @access  Private
export const stockOut = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, date, remark } = req.body;
    const amount = quantity; // rename quantity -> amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount is required and must be greater than 0" });
    }

    const product = await Product.findOne({ _id: id, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.initialQuantity < amount) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.initialQuantity -= amount;

    // transaction history
    if (!product.transactions) product.transactions = [];
    product.transactions.push({
      type: "OUT",
      amount,
      date: date || new Date(),
      remark: remark || "",
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    updateTransaction
// @route   PUT /api/product/:productId/transaction/:transactionId
// @access  Private
export const updateTransaction = async (req, res) => {
  try {
    const { productId, transactionId } = req.params;
    const { type, amount, date, remark } = req.body;

    const product = await Product.findOne({ _id: productId, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const transaction = product.transactions.id(transactionId);
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    // Adjust initialQuantity before updating
    if (transaction.type === "IN") product.initialQuantity -= transaction.amount;
    else product.initialQuantity += transaction.amount;

    // Update transaction
    transaction.type = type || transaction.type;
    transaction.amount = amount ?? transaction.amount;
    transaction.date = date || transaction.date;
    transaction.remark = remark || transaction.remark;

    // Re-adjust initialQuantity
    if (transaction.type === "IN") product.initialQuantity += transaction.amount;
    else product.initialQuantity -= transaction.amount;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    deleteTransaction
// @route   DELETE /api/product/:productId/transaction/:transactionId
// @access  Private
export const deleteTransaction = async (req, res) => {
  try {
    const { productId, transactionId } = req.params;

    const product = await Product.findOne({ _id: productId, user: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const txIndex = product.transactions.findIndex(
      (t) => t._id.toString() === transactionId
    );
    if (txIndex === -1) return res.status(404).json({ message: "Transaction not found" });

    const transaction = product.transactions[txIndex];

    // Prevent negative stock
    if (transaction.type === "IN" && product.initialQuantity - transaction.amount < 0) {
      return res.status(400).json({ message: "Cannot delete, would result in negative stock" });
    }

    // Adjust initialQuantity
    if (transaction.type === "IN") product.initialQuantity -= transaction.amount;
    else product.initialQuantity += transaction.amount;

    // Remove transaction
    product.transactions.splice(txIndex, 1);

    await product.save();
    res.json({ message: "Transaction deleted", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Product find karo jisme yeh transaction hai
    const product = await Product.findOne({ "transactions._id": transactionId });

    if (!product) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Transaction dhoondo
    const transaction = product.transactions.find(
      (t) => t._id.toString() === transactionId
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found in product" });
    }

    // 🔥 initialQuantity adjust karo (reverse effect)
    if (transaction.type === "IN") {
      // Agar IN delete kar rahe ho to stock ghatao
      product.initialQuantity -= transaction.amount;
    } else if (transaction.type === "OUT") {
      // Agar OUT delete kar rahe ho to stock wapas badhao
      product.initialQuantity += transaction.amount;
    }

    // Transaction ko remove karo
    product.transactions = product.transactions.filter(
      (t) => t._id.toString() !== transactionId
    );

    await product.save();

    res.json(product); // updated product return karo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Update Transaction By ID (without productId)
export const updateTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { type, amount, date, remark } = req.body;

    const newAmount = Number(amount); // 👈 safe conversion

    // Product find karo jisme yeh transaction hai
    const product = await Product.findOne({ "transactions._id": transactionId });

    if (!product) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Purana transaction nikaalo
    const transaction = product.transactions.id(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found in product" });
    }

    // 1️⃣ Purane transaction ka effect reverse karo
    if (transaction.type === "IN") {
      product.initialQuantity -= transaction.amount;
    } else if (transaction.type === "OUT") {
      product.initialQuantity += transaction.amount;
    }

    // 2️⃣ Transaction update karo
    transaction.type = type;
    transaction.amount = newAmount;
    transaction.date = date;
    transaction.remark = remark;

    // 3️⃣ Naye transaction ka effect apply karo
    if (type === "IN") {
      product.initialQuantity += newAmount;
    } else if (type === "OUT") {
      product.initialQuantity -= newAmount;
    }

    await product.save();

    res.json(product); // updated product bhejo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// // ✅ Update Transaction By ID (without productId)
// export const updateTransactionById = async (req, res) => {
//   try {
//     const { transactionId } = req.params;
//     const { type, amount, date, remark } = req.body;

//     // Product find karo jisme yeh transaction hai
//     const product = await Product.findOne({ "transactions._id": transactionId });

//     if (!product) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // Purana transaction nikaalo
//     const transaction = product.transactions.id(transactionId);
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found in product" });
//     }

//     // 1️⃣ Purane transaction ka effect reverse karo
//     if (transaction.type === "IN") {
//       product.initialQuantity -= transaction.amount;
//     } else if (transaction.type === "OUT") {
//       product.initialQuantity += transaction.amount;
//     }

//     // 2️⃣ Transaction update karo
//     transaction.type = type;
//     transaction.amount = amount;
//     transaction.date = date;
//     transaction.remark = remark;

//     // 3️⃣ Naye transaction ka effect apply karo
//     if (type === "IN") {
//       product.initialQuantity += amount;
//     } else if (type === "OUT") {
//       product.initialQuantity -= amount;
//     }

//     await product.save();

//     res.json(product); // updated product bhejo
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

