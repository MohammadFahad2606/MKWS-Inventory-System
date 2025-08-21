// src/pages/products/ProductDetailModal.jsx
import React from "react";
import { Dialog } from "@material-tailwind/react";
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
      size="sm"
      handler={toggle}
      className="w-full max-w-md rounded-xl shadow-lg relative p-6"
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text)",
      }}
    >
      {/* Close Button */}
      <button
        onClick={toggle}
        className="absolute top-3 right-3 text-xl font-bold"
        style={{
          color: "var(--color-muted)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-error)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-muted)")
        }
      >
        &times;
      </button>

      {/* Product Info */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-text-on-primary)",
          }}
        >
          {product.name?.charAt(0) || "?"}
        </div>
        <div>
          <h2
            className="font-semibold text-lg"
            style={{ color: "var(--color-text)" }}
          >
            {product.name}
          </h2>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            PID: {product.productId}
          </p>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Buy Rate: {product.buyRate}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>
          Description
        </h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          {product.description || "-"}
        </p>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr
              className="font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-text)",
              }}
            >
              <td className="p-2">Total In</td>
              <td className="p-2 text-right">
                {product.initialQuantity} pcs
              </td>
            </tr>
            <tr>
              <td className="p-2">Total Out</td>
              <td className="p-2 text-right">
                {product.initialQuantity - (product.currentQuantity ?? 0)} pcs
              </td>
            </tr>
            <tr
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-on-accent)",
              }}
            >
              <td className="p-2">In Hand</td>
              <td className="p-2 text-right">
                {product.currentQuantity ?? product.initialQuantity} pcs
              </td>
            </tr>
            <tr>
              <td className="p-2">Stock Price</td>
              <td className="p-2 text-right">
                {product.buyRate *
                  (product.currentQuantity ?? product.initialQuantity)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => onDelete(product._id)}
          className="px-4 py-2 rounded font-semibold"
          style={{
            background: "var(--color-error)",
            color: "var(--color-text-on-primary)",
          }}
        >
          DEL
        </button>
        <button
          onClick={() => onEdit(product)}
          className="px-4 py-2 rounded font-semibold"
          style={{
            background: "var(--color-warning)",
            color: "var(--color-text-on-warning)",
          }}
        >
          EDIT
        </button>
        <button
          onClick={handleTransaction}
          className="px-4 py-2 rounded font-semibold"
          style={{
            background: "var(--color-success)",
            color: "var(--color-text-on-primary)",
          }}
        >
          TRANSACTIONS
        </button>
      </div>
    </Dialog>
  );
}
