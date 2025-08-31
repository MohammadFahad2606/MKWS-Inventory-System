import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../redux/productSlice';
import ProductModal from './ProductModal';
import ProductList from './ProductList';
import ProductDetailModal from './ProductDetailModal';
import { toast } from 'react-toastify';

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
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleDetail = () => setDetailOpen(!detailOpen);

  const handleSubmit = async (data) => {
    try {
      if (editingProduct) {
        await dispatch(
          updateProduct({ id: editingProduct._id, data })
        ).unwrap();
        toast.success('Product updated successfully!');
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success('Product created successfully!');
      }
      setEditingProduct(null);
      toggleModal();
    } catch (err) {
      // backend duplicate key error fallback
      if (err?.response?.data?.code === 11000) {
        toast.error('Product ID must be unique (backend)');
      } else {
        toast.error('Failed to save product');
      }
    }
  };

  const handleShow = (product) => {
    setSelectedProduct(product);
    toggleDetail();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    toggleModal();
    toggleDetail();
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProduct(selectedProductId)).unwrap();
      toast.success('Product deleted successfully!');
      handleCloseDialog();
      toggleDetail();
    } catch (err) {
      toast.error(err || 'Failed to delete product');
    }
  };

  const handleTransaction = (product) => {
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
          <Button
            variant="text"
            style={{ color: 'var(--color-mutedForeground)' }}
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="gradient"
            style={{
              background: 'var(--color-destructive)',
              color: 'var(--color-primaryForeground)',
            }}
            onClick={confirmDelete}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>

      <div className="min-h-screen bg-[var(--color-background)] p-6">
        <Card
          className="rounded-2xl p-6 shadow-lg"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-foreground)',
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <Typography
              variant="h4"
              className="font-bold"
              style={{ color: 'var(--color-foreground)' }}
            >
              All Products
            </Typography>
            <Button
              className="rounded-l shadow-sm"
              style={{
                background: 'var(--color-success)',
                color: 'var(--color-primaryForeground)',
              }}
              onClick={toggleModal}
            >
              + Add New
            </Button>
          </div>

          {loading ? (
            <Typography style={{ color: 'var(--color-mutedForeground)' }}>
              Loading...
            </Typography>
          ) : error ? (
            <Typography style={{ color: 'var(--color-destructive)' }}>
              {error}
            </Typography>
          ) : (
            <ProductList products={items} onShow={handleShow} />
          )}
        </Card>

        {/* Product Modal */}
        <ProductModal
          open={modalOpen && !openDialog}
          toggle={toggleModal}
          onSubmit={handleSubmit}
          defaultValues={editingProduct}
          existingProductIds={items.map((p) => p.productId)}
        />

        {/* Product Detail Modal */}
        <ProductDetailModal
          open={detailOpen && !openDialog}
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

// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   Button,
//   Card,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from '@material-tailwind/react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from '../../../redux/productSlice';
// import ProductModal from './ProductModal';
// import ProductList from './ProductList';
// import ProductDetailModal from './ProductDetailModal';
// import { toast } from 'react-toastify';

// export function Product() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const dispatch = useDispatch();
//   const { items, loading, error } = useSelector((state) => state.products);

//   useEffect(() => {
//     if (!items || items.length === 0) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, items]);

//   const toggleModal = () => setModalOpen(!modalOpen);
//   const toggleDetail = () => setDetailOpen(!detailOpen);

//   const handleSubmit = (data) => {
//     if (editingProduct) {
//       dispatch(updateProduct({ id: editingProduct._id, data }))
//         .unwrap()
//         .then(() => toast.success('Product updated successfully!'))
//         .catch(() => toast.error('Failed to update product'));
//     } else {
//       dispatch(createProduct(data))
//         .unwrap()
//         .then(() => toast.success('Product created successfully!'))
//         .catch(() => toast.error('Failed to create product'));
//     }
//     setEditingProduct(null);
//     toggleModal();
//   };

//   const handleShow = (product) => {
//     setSelectedProduct(product);
//     toggleDetail();
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     toggleModal();
//     toggleDetail();
//   };

//   const handleOpenDialog = (id) => {
//     setSelectedProductId(id);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedProductId(null);
//   };

//   const confirmDelete = async () => {
//     try {
//       await dispatch(deleteProduct(selectedProductId)).unwrap();
//       toast.success('Product deleted successfully!');
//       handleCloseDialog();
//       toggleDetail();
//     } catch (err) {
//       toast.error(err || 'Failed to delete product');
//     }
//   };

//   const handleTransaction = (product) => {
//     // TODO: In/Out modal logic
//   };

//   return (
//     <>
//       <Dialog open={openDialog} handler={handleCloseDialog}>
//         <DialogHeader>Confirm Delete</DialogHeader>
//         <DialogBody divider>
//           Are you sure you want to delete this product?
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             style={{ color: 'var(--color-mutedForeground)' }}
//             onClick={handleCloseDialog}
//           >
//             No
//           </Button>
//           <Button
//             variant="gradient"
//             style={{
//               background: 'var(--color-destructive)',
//               color: 'var(--color-sidebarPrimaryForeground)',
//             }}
//             onClick={confirmDelete}
//           >
//             Yes
//           </Button>
//         </DialogFooter>
//       </Dialog>

//       <div className="min-h-screen bg-[var(--color-background)] p-6">
//         <Card
//           className="rounded-2xl p-6 shadow-lg"
//           style={{
//             background: 'var(--color-surface)',
//             color: 'var(--color-foreground)',
//           }}
//         >
//           <div className="mb-6 flex items-center justify-between">
//             <Typography
//               variant="h4"
//               className="font-bold"
//               style={{ color: 'var(--color-foreground)' }}
//             >
//               All Products
//             </Typography>
//             <Button
//               className="rounded-l shadow-sm"
//               style={{
//                 background: 'var(--color-success)',
//                 color: 'var(--color-primaryForeground)',
//               }}
//               onClick={toggleModal}
//             >
//               + Add New
//             </Button>
//           </div>

//           {loading ? (
//             <Typography style={{ color: 'var(--color-mutedForeground)' }}>
//               Loading...
//             </Typography>
//           ) : error ? (
//             <Typography style={{ color: 'var(--color-destructive)' }}>
//               {error}
//             </Typography>
//           ) : (
//             <ProductList products={items} onShow={handleShow} />
//           )}
//         </Card>

//         <ProductModal
//           open={modalOpen && !openDialog}
//           toggle={toggleModal}
//           onSubmit={handleSubmit}
//           defaultValues={editingProduct}
//         />

//         <ProductDetailModal
//           open={detailOpen && !openDialog}
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
