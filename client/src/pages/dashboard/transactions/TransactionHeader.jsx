import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionHeader({ title }) {
  const navigate = useNavigate();
  return (
    <header className=" p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-[var(--color-foreground)]">
        {title}
      </h1>
      <button
        className="bg-[var(--color-foreground)] text-[var(--color-background)] px-4 py-2 rounded-lg shadow"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </header>
  );
}
