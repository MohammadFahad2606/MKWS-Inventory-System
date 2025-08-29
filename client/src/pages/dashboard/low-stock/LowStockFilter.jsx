import React from "react";

export default function LowStockFilter({ value, onChange }) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <label className="font-semibold text-[var(--color-text)]">Low Stock Limit:</label>
      <input
        type="number"
        value={value}
        min="0"
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />
    </div>
  );
}
