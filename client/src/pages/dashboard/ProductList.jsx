// src/pages/products/ProductList.jsx
import React from "react";
import { Button, Typography } from "@material-tailwind/react";

export function ProductList({ products, onShow }) {
  if (!products.length)
    return (
      <Typography style={{ color: "var(--color-muted)" }}>
        No products yet.
      </Typography>
    );

  return (
    <div className="overflow-x-auto">
      <table
        className="min-w-full border-collapse"
        style={{
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      >
        <thead>
          <tr style={{ background: "var(--color-surface-variant)" }}>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Name
            </th>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Product ID
            </th>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Buy Rate
            </th>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Quantity
            </th>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Description
            </th>
            <th className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center hover:bg-[var(--color-hover)]">
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                {p.name}
              </td>
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                {p.productId}
              </td>
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                {p.buyRate}
              </td>
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                {p.initialQuantity}
              </td>
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                {p.description}
              </td>
              <td className="px-4 py-2 border" style={{ borderColor: "var(--color-border)" }}>
                <Button
                  size="sm"
                  onClick={() => onShow(p)}
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-text-on-primary)",
                  }}
                >
                  Show
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
