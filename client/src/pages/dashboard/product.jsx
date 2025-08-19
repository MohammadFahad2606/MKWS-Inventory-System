import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../redux/productSlice";
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
    // yahan aap In/Out modal bana ke use karenge
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">Products</Typography>
        <Button color="blue" onClick={toggleModal}>+ Add New</Button>
      </div>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="red">{error}</Typography>
      ) : (
        <ProductList products={items} onShow={handleShow} />
      )}

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
