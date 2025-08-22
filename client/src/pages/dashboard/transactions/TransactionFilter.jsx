import React from "react";

export default function TransactionFilter({
  items,
  selectedProduct,
  setSelectedProduct,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleGet,
  handleClear,
}) {
  return (
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
  );
}
