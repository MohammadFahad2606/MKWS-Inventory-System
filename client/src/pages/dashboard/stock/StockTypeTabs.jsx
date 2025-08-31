import React from "react";

export default function StockTypeTabs({ stockType, setStockType }) {
  return (
    <div className="mb-4">
      {/* commit: replaced text color with foreground */}
      <p style={{ color: "var(--color-foreground)" }}>Type:</p>
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={() => setStockType("in")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            stockType === "in"
              ? "bg-[var(--color-success)] text-[var(--color-cardForeground)]" // commit: used success & cardForeground
              : "bg-[var(--color-mutedForeground)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/20" // commit: mutedForeground & hover success
          }`}
        >
          Stock In
        </button>
        <button
          type="button"
          onClick={() => setStockType("out")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            stockType === "out"
              ? "bg-[var(--color-destructive)] text-[var(--color-cardForeground)]" // commit: destructive & cardForeground
              : "bg-[var(--color-mutedForeground)] text-[var(--color-foreground)] hover:bg-[var(--color-destructive)]/20" // commit: mutedForeground & hover destructive
          }`}
        >
          Stock Out
        </button>
      </div>
    </div>
  );
}
