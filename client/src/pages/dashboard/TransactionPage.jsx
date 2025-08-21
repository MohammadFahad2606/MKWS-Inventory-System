import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";

export default function TransactionPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [selectedProduct, setSelectedProduct] = useState(productId || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  // Filter transactions based on productId (from params) or selected product
  useEffect(() => {
    let transactions = [];

    if (productId) {
      const product = items.find((p) => p._id === productId);
      if (product) {
        transactions = product.transactions.map((t) => ({
          ...t,
          productName: product.name,
        }));
      }
    } else {
      transactions = items.flatMap((p) =>
        p.transactions.map((t) => ({ ...t, productName: p.name }))
      );
    }

    // Apply selected product filter only if productId not present
    if (!productId && selectedProduct) {
      transactions = transactions.filter((t) => t.productName === selectedProduct);
    }

    // // Date range filter
    // if (fromDate) transactions = transactions.filter((t) => new Date(t.date) >= new Date(fromDate));
    // if (toDate) transactions = transactions.filter((t) => new Date(t.date) <= new Date(toDate));

    // Date range filter
    if (fromDate) {
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0); // time ko reset
      transactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        tDate.setHours(0, 0, 0, 0);
        return tDate >= from;
      });
    }

    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999); // end of day
      transactions = transactions.filter((t) => new Date(t.date) <= to);
    }
    // Sort latest first
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredTransactions(transactions);
    setCurrentPage(1);
  }, [items, productId, selectedProduct, fromDate, toDate]);

  const handleGet = () => {
    // Just re-run the useEffect logic
    setSelectedProduct(selectedProduct);
  };

  const handleClear = () => {
    setSelectedProduct(productId || "");
    setFromDate("");
    setToDate("");
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Single product card info
  const singleProduct = items.find((p) => p._id === productId);

  if (loading) return <p className="text-[var(--color-text)]">Loading...</p>;
  if (error) return <p className="text-[var(--color-error)]">{error}</p>;
  if (productId && !singleProduct)
    return <p className="text-[var(--color-text)]">Product not found</p>;

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      {/* Header */}
      <header className="bg-[var(--color-primary)] p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-[var(--color-text-on-primary)]">
          {productId ? "Product Transactions" : "All Transactions"}
        </h1>
        <button
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Single Product Info Card */}
        {singleProduct && (
          <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 text-[var(--color-text-on-primary)]">
            <h2 className="text-lg font-bold mb-4">{singleProduct.name}</h2>
            <div className="bg-[var(--color-primary)] rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <tbody className="text-sm">
                  <tr className="border-b border-[var(--color-muted)]">
                    <td className="px-4 py-2 font-semibold">Buy Rate</td>
                    <td className="px-4 py-2">{singleProduct.buyRate}</td>
                  </tr>
                  <tr className="border-b border-[var(--color-muted)]">
                    <td className="px-4 py-2 font-semibold">Total In</td>
                    <td className="px-4 py-2">{singleProduct.totalIn}</td>
                  </tr>
                  <tr className="border-b border-[var(--color-muted)]">
                    <td className="px-4 py-2 font-semibold">Total Out</td>
                    <td className="px-4 py-2">{singleProduct.totalOut}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-semibold">In Hand</td>
                    <td className="px-4 py-2">{singleProduct.inHand}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filter Section (only show when no productId) */}
        {!productId && (
          <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-gray-600 font-semibold">Product</label>
                <select
                  className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {items.map((p) => (
                    <option key={p._id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-600 font-semibold">From</label>
                <input
                  type="date"
                  className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">To</label>
                <input
                  type="date"
                  className="w-full mt-1 border-gray-300 rounded-lg shadow-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-[var(--color-primary)] text-white font-semibold px-4 py-2 rounded-lg shadow"
                  onClick={handleGet}
                >
                  Get
                </button>
                <button
                  className="flex-1 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transaction List */}
        <div className="space-y-4">
          {currentTransactions.map((t, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-700">
                    {new Date(t.date).getDate()}
                  </p>
                  <p className="text-xs bg-orange-400 text-white rounded px-2 py-1">
                    {new Date(t.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-lg font-bold ${t.type === "IN" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {t.amount} {t.type}
                  </p>
                  <p className="text-sm text-gray-500">{t.productName}</p>
                </div>
              </div>
              <span className="text-gray-400">➡</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span className="flex items-center px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
