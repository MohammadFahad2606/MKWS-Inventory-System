// src/pages/products/ProductDetailModal.jsx
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
  const navigate = useNavigate();

  if (!product) return null;

  const handleTransaction = () => {
    toggle();
    navigate(`/dashboard/transactions/${product._id}`);
  };

  return (
    <Dialog
      open={open}
      size="lg"
      handler={toggle}
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
      }}
    >
      <DialogHeader style={{ color: "var(--color-primary)" }}>
        {product.name} - Details
      </DialogHeader>
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
          <Button
            onClick={() => onEdit(product)}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-text-on-primary)",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleTransaction}
            style={{
              background: "var(--color-success)",
              color: "var(--color-text-on-primary)",
            }}
          >
            Transaction
          </Button>
          <Button
            onClick={() => onDelete(product._id)}
            style={{
              background:   "var(--color-error)",
               color: "var(--color-text-on-primary)",
            }}
          >
            Delete
          </Button>
          <Button
            variant="text"
            onClick={toggle}
            style={{ 
              background: "var(--color-muted)",
              color: "var(--color-text-on-primary)"
             }}
          >
            Close
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
}
