
// import React, { useState } from "react";
// import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Textarea, Typography } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import {  updateProduct, deleteProduct } from "../../redux/productSlice";

// export default function ProductDetailModal({ open, toggle, product }) {
//   const dispatch = useDispatch();

//   if (!product) return null;



//   const handleDelete = () => {
//     if (window.confirm("Are you sure to delete this product?")) {
//       dispatch(deleteProduct(product._id));
//       toggle();
//     }
//   };

//   return (
//     <Dialog open={open} size="lg" handler={toggle}>
//       <DialogHeader>{product.name} - Details</DialogHeader>
//       <DialogBody divider>
//         <Typography><b>Product ID:</b> {product.productId}</Typography>
//         <Typography><b>Description:</b> {product.description}</Typography>
//         <Typography><b>Buy Rate:</b> {product.buyRate}</Typography>
//         <Typography><b>Initial Quantity:</b> {product.initialQuantity}</Typography>
//         <Typography><b>Current Quantity:</b> {product.currentQuantity ?? product.initialQuantity}</Typography>
//         <Typography><b>Stock Price:</b> {product.buyRate * (product.currentQuantity ?? product.initialQuantity)}</Typography>

        
//       </DialogBody>
//       <DialogFooter className="flex justify-between">
//         <div className="space-x-2">
//           <Button color="blue" onClick={() => {/* Edit logic here */}}>Edit</Button>
//           <Button color="red" onClick={handleDelete}>Delete</Button>
//           <Button variant="text" color="gray" onClick={toggle}>Close</Button>
//         </div>
//       </DialogFooter>
//     </Dialog>
//   );
// }
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function ProductDetailModal({
  open,
  toggle,
  product,
  onEdit,
  onDelete,
}) {

  const navigate = useNavigate(); // ✅ Hook top-level pe call

  if (!product) return null;
const handleTransaction = () => {
    toggle(); // modal close
    navigate(`/dashboard/transactions/${product._id}`); // ✅ navigate route
  };
  return (
    <Dialog open={open} size="lg" handler={toggle}>
      <DialogHeader>{product.name} - Details</DialogHeader>
      <DialogBody divider>
        <Typography>
          <b>Product ID:</b> {product.productId}
        </Typography>
        <Typography>
          <b>Description:</b> {product.description}
        </Typography>
        <Typography>
          <b>Buy Rate:</b> {product.buyRate}
        </Typography>
        <Typography>
          <b>Initial Quantity:</b> {product.initialQuantity}
        </Typography>
        <Typography>
          <b>Current Quantity:</b>{" "}
          {product.currentQuantity ?? product.initialQuantity}
        </Typography>
        <Typography>
          <b>Stock Price:</b>{" "}
          {product.buyRate *
            (product.currentQuantity ?? product.initialQuantity)}
        </Typography>
      </DialogBody>

      <DialogFooter className="flex justify-between">
        <div className="space-x-2">
          <Button color="blue" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button color="green" onClick={handleTransaction}>Transaction</Button>
          <Button color="red" onClick={() => onDelete(product._id)}>
            Delete
          </Button>
          <Button variant="text" color="gray" onClick={toggle}>
            Close
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
