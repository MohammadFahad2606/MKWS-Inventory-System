import React from "react";
import { Input } from "@material-tailwind/react";

export default function StockSearch({ search, setSearch }) {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="!border !rounded-md"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-foreground)",
          color: "var(--color-foreground)",
        }}
      />
    </div>
  );
}
