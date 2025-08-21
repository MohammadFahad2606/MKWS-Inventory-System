// src/pages/products/ProductList.jsx
import React from "react";
import { Button } from "@material-tailwind/react";

export function ProductList({ products, onShow }) {
  if (!products.length) {
    return (
      <p style={{ color: "var(--color-muted)" }}>No products yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div
          key={p._id}
          className="flex items-center justify-between border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
          }}
        >
          {/* Avatar + Info */}
          <div className="flex items-center gap-4">
            {/* Avatar Circle */}
            <div
              className="font-bold text-xl w-12 h-12 flex items-center justify-center rounded"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-text-on-primary)",
              }}
            >
              {p.name?.charAt(0) || "?"}
            </div>

            {/* Product Details */}
            <div>
              <h2 className="font-semibold">
                {p.name} - {p.productId}
              </h2>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {p.currentQuantity ?? p.initialQuantity} @ {p.buyRate} ={" "}
                {p.currentQuantity ?? p.initialQuantity}
              </p>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                {(p.currentQuantity ?? p.initialQuantity) *
                  (p.buyRate || 0)}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            size="sm"
            onClick={() => onShow(p)}
            className="px-4 py-1 rounded"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-text-on-primary)",
            }}
          >
            Option
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
