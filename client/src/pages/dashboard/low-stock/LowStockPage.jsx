import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '@/redux/productSlice';
import TransactionPagination from '../transactions/TransactionPagination';
import ExportButtons from '../transactions/ExportButtons';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function LowStockPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);

  const [threshold, setThreshold] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name"); // 👈 default sort by name
  const itemsPerPage = 10;

  useEffect(() => {
    const saved = localStorage.getItem('lowStockThreshold');
    if (saved) setThreshold(Number(saved));
  }, []);

  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const handleThresholdChange = (value) => {
    setThreshold(value);
    localStorage.setItem('lowStockThreshold', value);
    setCurrentPage(1);
  };

  // Low stock items with inHand calculation
  const lowStockItems = useMemo(() => {
    let productsWithStock = items.map((product) => {
      const totalIn =
        product.transactions
          ?.filter((t) => t.type === 'IN')
          .reduce((sum, t) => sum + t.amount, 0) || 0;
      const totalOut =
        product.transactions
          ?.filter((t) => t.type === 'OUT')
          .reduce((sum, t) => sum + t.amount, 0) || 0;
      const inHand = totalIn - totalOut;
      return { ...product, inHand };
    });

    // Filter by low stock
    let filtered = productsWithStock.filter((p) => p.inHand <= threshold);

    // Sorting logic
    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // latest first
    }

    return filtered;
  }, [items, threshold, sortBy]);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = lowStockItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(lowStockItems.length / itemsPerPage);

  if (loading)
    return <p style={{ color: 'var(--color-mutedForeground)' }}>Loading...</p>;
  if (error)
    return <p style={{ color: 'var(--color-destructive)' }}>{error}</p>;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="flex items-center justify-between  p-4 mt-4 rounded-lg">
        <h1 className="flex gap-3 items-center text-xl font-bold text-[var(--color-Foreground)]">
          <ExclamationTriangleIcon className="h-10 w-10" /> Low Stock Products
        </h1>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-6">
        <div className="mb-4 flex items-center gap-4">
          <label className="font-semibold text-[var(--color-foreground)]">
            Low Stock Limit:
          </label>
          <input
            type="number"
            value={threshold}
            min="0"
            onChange={(e) => handleThresholdChange(Number(e.target.value))}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />

          {/* 👇 Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-2 text-[var(--color-foreground)]"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        <ExportButtons
          transactions={lowStockItems.map((p) => ({
            productName: p.name,
            type: 'Low Stock',
            amount: p.inHand,
            buyRate: p.buyRate,
            date: new Date(),
            remark: '',
          }))}
          type="lowstock"
        />

        {!currentItems.length ? (
          <p style={{ color: 'var(--color-mutedForeground)' }}>
            🎉 No low stock items found!
          </p>
        ) : (
          <div className="space-y-3">
            {currentItems.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between rounded-lg border p-3 transition hover:shadow-md"
                style={{
                  borderColor: 'var(--color-border)',
                  background: 'var(--color-card)',
                  color: 'var(--color-foreground)',
                }}
              >
                <div>
                  <p className="font-semibold">
                    {product.name} - {product.productId}
                  </p>
                  <p className="text-sm text-[var(--color-mutedForeground)]">
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

        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchProducts } from '@/redux/productSlice';
// import TransactionPagination from '../transactions/TransactionPagination';
// import ExportButtons from '../transactions/ExportButtons';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// export default function LowStockPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { items, loading, error } = useSelector((state) => state.products);

//   const [threshold, setThreshold] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const saved = localStorage.getItem('lowStockThreshold');
//     if (saved) setThreshold(Number(saved));
//   }, []);

//   useEffect(() => {
//     if (!items.length) dispatch(fetchProducts());
//   }, [dispatch, items.length]);

//   const handleThresholdChange = (value) => {
//     setThreshold(value);
//     localStorage.setItem('lowStockThreshold', value);
//     setCurrentPage(1);
//   };

//   const lowStockItems = items
//     .map((product) => {
//       const totalIn =
//         product.transactions
//           ?.filter((t) => t.type === 'IN')
//           .reduce((sum, t) => sum + t.amount, 0) || 0;
//       const totalOut =
//         product.transactions
//           ?.filter((t) => t.type === 'OUT')
//           .reduce((sum, t) => sum + t.amount, 0) || 0;
//       const inHand = totalIn - totalOut;
//       return { ...product, inHand };
//     })
//     .filter((p) => p.inHand <= threshold);

//     // console.log('Low stock items:', lowStockItems);

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = lowStockItems.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(lowStockItems.length / itemsPerPage);

//   if (loading)
//     // commit: use mutedForeground for loading text
//     return <p style={{ color: 'var(--color-mutedForeground)' }}>Loading...</p>;
//   if (error)
//     // commit: use destructive color for error
//     return <p style={{ color: 'var(--color-destructive)' }}>{error}</p>;
// console.log(currentItems)
//   return (
//     <div className="min-h-screen bg-[var(--color-background)]">
      
//       <header className="flex items-center justify-between  p-4 mt-4 rounded-lg">
//         <h1 className="flex gap-3 items-center text-xl font-bold text-[var(--color-Foreground)]">
//            <ExclamationTriangleIcon className="h-10 w-10" /> Low Stock Products
//         </h1>
      
//       </header>

//       <main className="mx-auto max-w-5xl space-y-6 p-6">
//         <div className="mb-4 flex items-center gap-4">
//           <label className="font-semibold text-[var(--color-foreground)]">
//             Low Stock Limit:
//           </label>
//           <input
//             type="number"
//             value={threshold}
//             min="0"
//             onChange={(e) => handleThresholdChange(Number(e.target.value))}
//             className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
//           />
//         </div>

//         <ExportButtons
//           transactions={lowStockItems.map((p) => ({
//             productName: p.name,
//             type: 'Low Stock',
//             amount: p.inHand,
//             buyRate: p.buyRate,
//             date: new Date(),
//             remark: '',
//           }))}
//           type="lowstock"
//         />

//         {!currentItems.length ? (
//           // commit: mutedForeground for empty state
//           <p style={{ color: 'var(--color-mutedForeground)' }}>
//             🎉 No low stock items found!
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {currentItems.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex items-center justify-between rounded-lg border p-3 transition hover:shadow-md"
//                 style={{
//                   borderColor: 'var(--color-border)',
//                   background: 'var(--color-card)',
//                   color: 'var(--color-foreground)',
//                 }}
//               >
//                 <div>
//                   <p className="font-semibold">
//                     {product.name} - {product.productId}
//                   </p>
//                   <p className="text-sm text-[var(--color-mutedForeground)]">
//                     In hand: {product.inHand} pcs | Rate: {product.buyRate}
//                   </p>
//                   <p className="font-semibold text-[var(--color-primary)]">
//                     Value: {product.inHand * product.buyRate} PKR
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <TransactionPagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           setCurrentPage={setCurrentPage}
//         />
//       </main>
//     </div>
//   );
// }
