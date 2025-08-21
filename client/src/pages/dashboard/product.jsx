// src/pages/products/Product.jsx

import React, { useState, useEffect } from "react";
import { Typography, Button, Card } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/productSlice";
import ProductModal from "./ProductModal";
import ProductList from "./ProductList";
import ProductDetailModal from "./ProductDetailModal";

export function Product() {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDetail = () => setDetailOpen(!detailOpen);

  const handleSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, data }));
    } else {
      dispatch(createProduct(data));
    }
    setEditingProduct(null);
    toggleModal();
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    toggleDetail();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    toggleModal();
    toggleDetail(); // close detail modal when editing
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
      toggleDetail();
    }
  };

  const handleTransaction = (product) => {
    console.log("Transaction logic for:", product);
    // Yahan In/Out modal banega
  };

  return (
    <div className="p-6 bg-[var(--color-bg)] min-h-screen">
      <Card
        className="p-6 rounded-2xl shadow-lg"
        style={{
          background: "var(--color-surface)",
          color: "var(--color-text)",
          boxShadow: "var(--shadow-elev-1)",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <Typography
            variant="h4"
            className="font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Products
          </Typography>
          <Button
            className="rounded-xl shadow-md"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
              boxShadow: "var(--shadow-elev-2)",
            }}
            onClick={toggleModal}
          >
            + Add New
          </Button>
        </div>

        {loading ? (
          <Typography style={{ color: "var(--color-muted)" }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography style={{ color: "red" }}>{error}</Typography>
        ) : (
          <ProductList products={items} onShow={handleShow} />
        )}
      </Card>

      {/* Add / Edit Modal */}
      <ProductModal
        open={modalOpen}
        toggle={toggleModal}
        onSubmit={handleSubmit}
        defaultValues={editingProduct}
      />

      {/* Detail Modal */}
      <ProductDetailModal
        open={detailOpen}
        toggle={toggleDetail}
        product={selectedProduct}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTransaction={handleTransaction}
      />
    </div>
  );
}

export default Product;
