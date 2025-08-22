import React from "react";

export default function ProductTable({ products, loading, selectedProduct, setSelectedProduct }) {
  return (
    <div className="mb-4 overflow-x-auto">
      <div className="min-w-[600px] max-h-[220px] overflow-y-auto">
        <table className="min-w-full border-collapse" style={{ borderColor: "var(--color-muted)" }}>
          <thead>
            <tr style={{ background: "var(--color-surface)" }}>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Product ID</th>
              <th className="border px-4 py-2">Buy Rate</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No products found</td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="text-center" style={{ background: "var(--color-surface)" }}>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.productId}</td>
                  <td className="border px-4 py-2">{p.buyRate}</td>
                  <td className="border px-4 py-2">{p.initialQuantity}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="radio"
                      name="selectedProduct"
                      checked={selectedProduct?._id === p._id}
                      onChange={() => setSelectedProduct(p)}
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
