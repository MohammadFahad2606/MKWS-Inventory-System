import React, { useState, useMemo } from 'react';

export default function ProductTable({
  products,
  loading,
  selectedProduct,
  setSelectedProduct,
}) {
  const [sortBy, setSortBy] = useState('name'); // 👈 default sort by name

  // Sorting logic
  const sortedProducts = useMemo(() => {
    let items = [...products];

    if (sortBy === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // latest first
    }

    return items;
  }, [products, sortBy]);

  return (
    <div className="mb-4 overflow-x-auto">
      {/* Sorting dropdown */}
      <div className="mb-2 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-2 text-[var(--color-foreground)]"
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      <div className="max-h-[220px] min-w-[600px] overflow-y-auto">
        <table
          className="min-w-full border-collapse"
          style={{ borderColor: 'var(--color-mutedForeground)' }}
        >
          <thead>
            <tr style={{ background: 'var(--color-card)' }}>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">
                Name
              </th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">
                Product ID
              </th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">
                Buy Rate
              </th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">
                Quantity
              </th>
              <th className="border px-4 py-2 text-[var(--color-foreground)]">
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-[var(--color-mutedForeground)]"
                >
                  Loading...
                </td>
              </tr>
            ) : sortedProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-[var(--color-mutedForeground)]"
                >
                  No products found
                </td>
              </tr>
            ) : (
              sortedProducts.map((p) => (
                <tr
                  key={p._id}
                  className="text-center"
                  style={{ background: 'var(--color-card)' }}
                >
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    {p.name}
                  </td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    {p.productId}
                  </td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    {p.buyRate}
                  </td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    {p.initialQuantity}
                  </td>
                  <td className="border px-4 py-2 text-[var(--color-foreground)]">
                    <input
                      type="radio"
                      name="selectedProduct"
                      checked={selectedProduct?._id === p._id}
                      onChange={() => setSelectedProduct(p)}
                      className="accent-[var(--color-accentForeground)]"
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

// import React from "react";

// export default function ProductTable({ products, loading, selectedProduct, setSelectedProduct }) {
//   return (
//     <div className="mb-4 overflow-x-auto">
//       <div className="min-w-[600px] max-h-[220px] overflow-y-auto">
//         <table className="min-w-full border-collapse" style={{ borderColor: "var(--color-mutedForeground)" }}>
//           <thead>
//             <tr style={{ background: "var(--color-card)" }}>
//               <th className="border px-4 py-2 text-[var(--color-foreground)]">Name</th>
//               <th className="border px-4 py-2 text-[var(--color-foreground)]">Product ID</th>
//               <th className="border px-4 py-2 text-[var(--color-foreground)]">Buy Rate</th>
//               <th className="border px-4 py-2 text-[var(--color-foreground)]">Quantity</th>
//               <th className="border px-4 py-2 text-[var(--color-foreground)]">Select</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="text-center text-[var(--color-mutedForeground)]">Loading...</td>
//               </tr>
//             ) : products.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center text-[var(--color-mutedForeground)]">No products found</td>
//               </tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p._id} className="text-center" style={{ background: "var(--color-card)" }}>
//                   <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.name}</td>
//                   <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.productId}</td>
//                   <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.buyRate}</td>
//                   <td className="border px-4 py-2 text-[var(--color-foreground)]">{p.initialQuantity}</td>
//                   <td className="border px-4 py-2 text-[var(--color-foreground)]">
//                     <input
//                       type="radio"
//                       name="selectedProduct"
//                       checked={selectedProduct?._id === p._id}
//                       onChange={() => setSelectedProduct(p)}
//                       className="accent-[var(--color-accentForeground)]" // commit: radio button color using accentForeground
//                     />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
