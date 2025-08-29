
import React, { useState, useEffect } from "react";
import { Typography, Button, Card, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../../../redux/productSlice";
import ProductModal from "./ProductModal";
import ProductList from "./ProductList";
import ProductDetailModal from "./ProductDetailModal";
import { toast } from "react-toastify";

export function Product() {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDetail = () => setDetailOpen(!detailOpen);

  // Add / Update product
  const handleSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, data }))
        .unwrap()
        .then(() => toast.success("Product updated successfully!"))
        .catch(() => toast.error("Failed to update product"));
    } else {
      dispatch(createProduct(data))
        .unwrap()
        .then(() => toast.success("Product created successfully!"))
        .catch(() => toast.error("Failed to create product"));
    }
    setEditingProduct(null);
    toggleModal();
  };

  // Show product detail
  const handleShow = (product) => {
    setSelectedProduct(product);
    toggleDetail();
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    toggleModal();
    toggleDetail(); // Close detail modal when editing
  };

  // Open delete confirmation dialog
  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  // Close delete dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProductId)).unwrap();
      toast.success("Product deleted successfully!");
      handleCloseDialog();
      toggleDetail(); // optional: close detail modal after delete
    } catch (err) {
      toast.error(err || "Failed to delete product");
    }
  };

  const handleTransaction = (product) => {
    console.log("Transaction logic for:", product);
    // TODO: In/Out modal logic
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this product?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={handleCloseDialog}>
            No
          </Button>
          <Button variant="gradient" color="red" onClick={confirmDelete}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="p-6 bg-[var(--color-bg)] min-h-screen">
        <Card className="p-6 rounded-2xl shadow-lg" style={{ background: "var(--color-surface)", color: "var(--color-text)" }}>
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h4" className="font-bold" style={{ color: "var(--color-text)" }}>
              All Products
            </Typography>
            <Button className="rounded-l shadow-sm" style={{ background: "var(--color-success)", color: "var(--color-text-on-primary)" }} onClick={toggleModal}>
              + Add New
            </Button>
          </div>

          {loading ? (
            <Typography style={{ color: "var(--color-muted)" }}>Loading...</Typography>
          ) : error ? (
            <Typography style={{ color: "red" }}>{error}</Typography>
          ) : (
            <ProductList products={items} onShow={handleShow} />
          )}
        </Card>

        {/* Add / Edit Modal */}
        <ProductModal open={modalOpen && !openDialog} // prevent focus issues
          toggle={toggleModal} onSubmit={handleSubmit} defaultValues={editingProduct} />

        {/* Detail Modal */}
        <ProductDetailModal
          open={detailOpen && !openDialog} // prevent focus issues
          toggle={toggleDetail}
          product={selectedProduct}
          onEdit={handleEdit}
          onDelete={handleOpenDialog}
          onTransaction={handleTransaction}
        />
      </div>
    </>
  );
}

export default Product;



// import React, {
//   useState, useEffect, useMemo
// } from "react";
// import { Typography, Button, Card } from "@material-tailwind/react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../../../redux/productSlice";
// import ProductModal from "./ProductModal";
// import ProductList from "./ProductList";
// import ProductDetailModal from "./ProductDetailModal";
// import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
// import { toast } from "react-toastify"


// export function Product() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [search, setSearch] = useState("");
// const [openDialog, setOpenDialog] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);


//   const toggleModal = () => setModalOpen(!modalOpen);
//   const toggleDetail = () => setDetailOpen(!detailOpen);







//   const handleSubmit = (data) => {
//     if (editingProduct) {
//       dispatch(updateProduct({ id: editingProduct._id, data }))
//         .unwrap()
//         .then(() => toast.success("Product updated successfully!"))
//         .catch(() => toast.error("Failed to update product"));
//     } else {
//       dispatch(createProduct(data))
//         .unwrap()
//         .then(() => toast.success("Product created successfully!"))
//         .catch(() => toast.error("Failed to create product"));
//     }
//     setEditingProduct(null);
//     toggleModal();
//   };


//   // const handleSubmit = (data) => {
//   //   if (editingProduct) {
//   //     dispatch(updateProduct({ id: editingProduct._id, data }));
//   //   } else {
//   //     dispatch(createProduct(data));
//   //   }
//   //   setEditingProduct(null);
//   //   toggleModal();
//   // };
//   // console.log(items)
//   const handleShow = (product) => {
//     setSelectedProduct(product);
//     toggleDetail();
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     toggleModal();
//     toggleDetail(); // close detail modal when editing
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       dispatch(deleteProduct(id));
//       toggleDetail();
//     }
//   };

//   const handleTransaction = (product) => {
//     console.log("Transaction logic for:", product);
//     // Yahan In/Out modal banega
//   };



//   // Open confirmation dialog
//   const handleOpenDialog = (id) => {
//     setSelectedProductId(id);
//     setOpenDialog(true);
//   };

//   // Close dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedProductId(null);
//   };

//   // Confirm delete with toast
//   const confirmDelete = async () => {
//     try {
//       await dispatch(deleteProduct(selectedProductId)).unwrap(); // async thunk
//       toast.success("Product deleted successfully!");
//       toggleDetail(); // close modal/panel if open
//       handleCloseDialog();
//     } catch (err) {
//       toast.error(err || "Failed to delete product");
//     }
//   };

//   return (

//     <>


//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDialog} handler={handleCloseDialog}>
//         <DialogHeader>Confirm Delete</DialogHeader>
//         <DialogBody divider>
//           Are you sure you want to delete this product?
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="gray" onClick={handleCloseDialog}>
//             No
//           </Button>
//           <Button variant="gradient" color="red" onClick={confirmDelete}>
//             Yes
//           </Button>
//         </DialogFooter>
//       </Dialog>


//       <div className="p-6 bg-[var(--color-bg)] min-h-screen">
//         <Card
//           className="p-6 rounded-2xl shadow-lg"
//           style={{
//             background: "var(--color-surface)",
//             color: "var(--color-text)",
//             boxShadow: "var(--shadow-elev-1)",
//           }}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <Typography
//               variant="h4"
//               className="font-bold"
//               style={{ color: "var(--color-text)" }}
//             >
//               All Products
//             </Typography>
//             <Button
//               className="rounded-l shadow-sm"
//               style={{
//                 background: "var(--color-success)",
//                 color: "var(--color-text-on-primary)",

//               }}
//               onClick={toggleModal}
//             >
//               + Add New
//             </Button>
//           </div>





//           {loading ? (
//             <Typography style={{ color: "var(--color-muted)" }}>
//               Loading...
//             </Typography>
//           ) : error ? (
//             <Typography style={{ color: "red" }}>{error}</Typography>
//           ) : (
//             <ProductList products={items} onShow={handleShow} />
//           )}
//         </Card>

//         {/* Add / Edit Modal */}
//         <ProductModal
//           open={modalOpen}
//           toggle={toggleModal}
//           onSubmit={handleSubmit}
//           defaultValues={editingProduct}
//         />

//         {/* Detail Modal */}
//         <ProductDetailModal
//           open={detailOpen}
//           toggle={toggleDetail}
//           product={selectedProduct}
//           onEdit={handleEdit}
//           onDelete={handleOpenDialog}
//           onTransaction={handleTransaction}
//         />
//       </div>

//     </>
//   );
// }

// export default Product;
