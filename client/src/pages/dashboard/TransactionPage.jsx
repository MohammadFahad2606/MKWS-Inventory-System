import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";

export default function TransactionPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  if (loading) return <p className="text-[var(--color-text)]">Loading...</p>;
  if (error) return <p className="text-[var(--color-error)]">{error}</p>;

  let transactions = [];
  let product = null;

  if (productId) {
    product = items.find((p) => p._id === productId);
    if (!product) return <p className="text-[var(--color-text)]">Product not found</p>;
    transactions = product.transactions.map((t) => ({ ...t, productName: product.name }));
  } else {
    transactions = items
      .flatMap((p) =>
        p.transactions.map((t) => ({
          ...t,
          productName: p.name,
        }))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }

  // ------------------- UI -------------------
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
        {productId ? (
          <>
            {/* Product Info Card */}
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-lg p-6 text-[var(--color-text-on-primary)]">
              <h2 className="text-lg font-bold mb-4">{product.name}</h2>
              <div className="bg-[var(--color-primary)] rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <tbody className="text-sm">
                    <tr className="border-b border-[var(--color-muted)]">
                      <td className="px-4 py-2 font-semibold">Buy Rate</td>
                      <td className="px-4 py-2">{product.buyRate}</td>
                    </tr>
                    <tr className="border-b border-[var(--color-muted)]">
                      <td className="px-4 py-2 font-semibold">Total In</td>
                      <td className="px-4 py-2">{product.totalIn}</td>
                    </tr>
                    <tr className="border-b border-[var(--color-muted)]">
                      <td className="px-4 py-2 font-semibold">Total Out</td>
                      <td className="px-4 py-2">{product.totalOut}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold">In Hand</td>
                      <td className="px-4 py-2">{product.inHand}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
              {transactions.map((t, idx) => (
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
                        className={`text-lg font-bold ${
                          t.type === "IN" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {t.type} {t.amount}
                      </p>
                      <p className="text-sm text-gray-500">{product.name}</p>
                    </div>
                  </div>
                  <span className="text-gray-400">➡</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Filter Section */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-gray-600 font-semibold">Product</label>
                  <select className="w-full mt-1 border-gray-300 rounded-lg shadow-sm">
                    <option>Select Product</option>
                    {items.map((p) => (
                      <option key={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">From</label>
                  <input type="date" className="w-full mt-1 border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">To</label>
                  <input type="date" className="w-full mt-1 border-gray-300 rounded-lg shadow-sm" />
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-[var(--color-primary)] text-white font-semibold px-4 py-2 rounded-lg shadow">
                    Get
                  </button>
                  <button className="flex-1 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow">
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="space-y-4">
              {transactions.map((t, idx) => (
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
                        className={`text-lg font-bold ${
                          t.type === "IN" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {t.amount}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t.productName} | {t.type}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">➡</span>
                </div>
              ))}
            </div>

            {/* Export Buttons */}
            <div className="flex justify-center space-x-6 mt-10">
              <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow">
                Export CSV
              </button>
              <button className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow">
                Export PDF
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
