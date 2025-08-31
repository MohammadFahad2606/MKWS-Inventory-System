import React from "react";

export default function ProductTable({ products, loading, selectedProduct, setSelectedProduct }) {
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="min-w-[600px] max-h-[220px] overflow-y-auto">
        <table className="min-w-full border-collapse" style={{ borderColor: "var(--color-mutedForeground)" }}>
          <thead>
            <tr style={{ background: "var(--color-card)" }}>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">Name</th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">Product ID</th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">Buy Rate</th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">Quantity</th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">Select</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center text-[var(--color-mutedForeground)]">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-[var(--color-mutedForeground)]">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="text-center" style={{ background: "var(--color-card)" }}>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.name}</td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.productId}</td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.buyRate}</td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.initialQuantity}</td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    <input
                      type="radio"
                      name="selectedProduct"
                      checked={selectedProduct?._id === p._id}
                      onChange={() => setSelectedProduct(p)}
                      className="accent-[var(--color-accentForeground)]" // commit: radio button color using accentForeground
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
