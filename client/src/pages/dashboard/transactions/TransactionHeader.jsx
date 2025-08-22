import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionHeader({ title }) {
  const navigate = useNavigate();
  return (
    <header className="bg-[var(--color-primary)] p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-[var(--color-text-on-primary)]">
        {title}
      </h1>
      <button
        className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </header>
  );
}
