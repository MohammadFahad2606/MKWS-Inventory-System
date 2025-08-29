
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "@/redux/productSlice";
import TransactionPagination from "../transactions/TransactionPagination";
import ExportButtons from "../transactions/ExportButtons";

export default function LowStockPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  const [threshold, setThreshold] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load threshold from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lowStockThreshold");
    if (saved) setThreshold(Number(saved));
  }, []);

  // Fetch products on mount
  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const handleThresholdChange = (value) => {
    setThreshold(value);
    localStorage.setItem("lowStockThreshold", value);
    setCurrentPage(1);
  };

  // Filter low stock items
  const lowStockItems = items
    .map((product) => {
      const totalIn =
        product.transactions
          ?.filter((t) => t.type === "IN")
          .reduce((sum, t) => sum + t.amount, 0) || 0;
      const totalOut =
        product.transactions
          ?.filter((t) => t.type === "OUT")
          .reduce((sum, t) => sum + t.amount, 0) || 0;
      const inHand = totalIn - totalOut;
      return { ...product, inHand };
    })
    .filter((p) => p.inHand <= threshold);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = lowStockItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(lowStockItems.length / itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      {/* 🔹 Header with Back Button */}
      <header className="bg-[var(--color-primary)] p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-[var(--color-text-on-primary)]">
          📉 Low Stock Products
        </h1>
        <button
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* 🔹 Filter */}
        <div className="mb-4 flex items-center gap-4">
          <label className="font-semibold text-[var(--color-text)]">
            Low Stock Limit:
          </label>
          <input
            type="number"
            value={threshold}
            min="0"
            onChange={(e) => handleThresholdChange(Number(e.target.value))}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* 🔹 Export Buttons */}
        <ExportButtons
          transactions={currentItems.map((p) => ({
            productName: p.name,
            type: "Low Stock",
            amount: p.inHand,
            buyRate: p.buyRate,
            date: new Date(),
            remark: "",
          }))}type="lowstock"
        />

        {/* 🔹 List Section */}
        {!currentItems.length ? (
          <p style={{ color: "var(--color-muted)" }}>
            🎉 No low stock items found!
          </p>
        ) : (
          <div className="space-y-3">
            {currentItems.map((product) => (
              <div
                key={product._id}
                className="p-3 border rounded-lg flex justify-between items-center hover:shadow-md transition"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                }}
              >
                <div>
                  <p className="font-semibold">
                    {product.name} - {product.productId}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    In hand: {product.inHand} pcs | Rate: {product.buyRate}
                  </p>
                  <p className="font-semibold text-[var(--color-primary)]">
                    Value: {product.inHand * product.buyRate} PKR
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 Pagination */}
        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
}




// Working
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "@/redux/productSlice";

// export default function LowStockPage() {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.products);
//   const [threshold, setThreshold] = useState(10); // default 10

//   // Load threshold from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem("lowStockThreshold");
//     if (saved) setThreshold(Number(saved));
//   }, []);

//   // Fetch products on mount
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleThresholdChange = (value) => {
//     setThreshold(value);
//     localStorage.setItem("lowStockThreshold", value);
//   };

//   const lowStockItems = items.filter((product) => {
//     const totalIn =
//       product.transactions
//         ?.filter((t) => t.type === "IN")
//         .reduce((sum, t) => sum + t.amount, 0) || 0;

//     const totalOut =
//       product.transactions
//         ?.filter((t) => t.type === "OUT")
//         .reduce((sum, t) => sum + t.amount, 0) || 0;

//     const inHand = totalIn - totalOut;
//     return inHand <= threshold;
//   });

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div className="p-6 bg-[var(--color-bg)] min-h-screen">
//       <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)]">
//         📉 Low Stock Products
//       </h2>

//       <div className="mb-4 flex items-center gap-4">
//         <label className="font-semibold text-[var(--color-text)]">
//           Low Stock Limit:
//         </label>
//         <input
//           type="number"
//           value={threshold}
//           min="0"
//           onChange={(e) => handleThresholdChange(Number(e.target.value))}
//           className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//         />
//       </div>

//       {!lowStockItems.length ? (
//         <p style={{ color: "var(--color-muted)" }}>
//           🎉 No low stock items found!
//         </p>
//       ) : (
//         <div className="space-y-3">
//           {lowStockItems.map((product) => {
//             const totalIn =
//               product.transactions
//                 ?.filter((t) => t.type === "IN")
//                 .reduce((sum, t) => sum + t.amount, 0) || 0;

//             const totalOut =
//               product.transactions
//                 ?.filter((t) => t.type === "OUT")
//                 .reduce((sum, t) => sum + t.amount, 0) || 0;

//             const inHand = totalIn - totalOut;

//             return (
//               <div
//                 key={product._id}
//                 className="p-3 border rounded-lg flex justify-between items-center hover:shadow-md transition"
//                 style={{
//                   borderColor: "var(--color-border)",
//                   background: "var(--color-surface)",
//                   color: "var(--color-text)",
//                 }}
//               >
//                 <div>
//                   <p className="font-semibold">
//                     {product.name} - {product.productId}
//                   </p>
//                   <p className="text-sm text-[var(--color-muted)]">
//                     In hand: {inHand} pcs | Rate: {product.buyRate}
//                   </p>
//                   <p className="font-semibold text-[var(--color-primary)]">
//                     Value: {inHand * product.buyRate} PKR
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
