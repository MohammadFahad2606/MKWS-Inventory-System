import React from "react";

export default function StockTypeTabs({ stockType, setStockType }) {
  return (
    <div className="mb-4">
      <p style={{ color: "var(--color-text)" }}>Type:</p>
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={() => setStockType("in")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            stockType === "in"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-green-100"
          }`}
        >
          Stock In
        </button>
        <button
          type="button"
          onClick={() => setStockType("out")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            stockType === "out"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-red-100"
          }`}
        >
          Stock Out
        </button>
      </div>
    </div>
  );
}
