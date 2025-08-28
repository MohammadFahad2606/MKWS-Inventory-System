// client/src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products/products"); // GET all products
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Create new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await API.post("/products/product", productData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Update existing product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/products/product/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/products/product/${id}`);
      return { id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Add stock
export const addStock = createAsyncThunk(
  "products/addStock",
  async ({ id, type, quantity, date, remark }, { rejectWithValue }) => {
    try {
      const res = await API.post(`products/product/${id}/${type}`, { quantity, date, remark });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || err.message);
    }
  }
);


// ✅ Update Transaction
export const updateTransaction = createAsyncThunk(
  "products/updateTransaction",
  async ({ productId, transactionId, type, amount, date, remark }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/products/product/${productId}/transaction/${transactionId}`, {
        type,
        amount,
        // quantity: amount,
        date,
        remark,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Delete Transaction
export const deleteTransaction = createAsyncThunk(
  "products/deleteTransaction",
  async ({ productId, transactionId }, { rejectWithValue }) => {
    try {
      await API.delete(`/products/product/${productId}/transaction/${transactionId}`);
      return { productId, transactionId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Delete Transaction By ID (sirf transactionId se)
export const deleteTransactionById = createAsyncThunk(
  "products/deleteTransactionById",
  async (transactionId, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${transactionId}`);
      return { transactionId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateTransactionById = createAsyncThunk(
  "products/updateTransactionById",
  async ({ transactionId, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/products/transaction/${transactionId}`, data);
      return res.data; // updated product
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p._id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        // update product in items array
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.error = action.payload || "Failed to update transaction";
      })      
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const product = state.items.find((p) => p._id === action.payload.productId);
        if (product) {
          product.transactions = product.transactions.filter(
            (t) => t._id.toString() !== action.payload.transactionId
          )
        }
      })
      .addCase(deleteTransactionById.fulfilled, (state, action) => {
        state.items.forEach((product) => {
          product.transactions = product.transactions.filter(
            (t) => t._id.toString() !== action.payload.transactionId
          );
        })
      })
      .addCase(deleteTransactionById.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete transaction by ID";
      })
      .addCase(updateTransactionById.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // pura product replace kar do
        }
      })
      .addCase(updateTransactionById.rejected, (state, action) => {
        state.error = action.payload || "Failed to update transaction by ID";
      })
      
      
  },
});

export default productSlice.reducer;
