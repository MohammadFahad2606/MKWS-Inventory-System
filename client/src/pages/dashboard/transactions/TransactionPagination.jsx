import React from "react";

export default function TransactionPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
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
  );
}
