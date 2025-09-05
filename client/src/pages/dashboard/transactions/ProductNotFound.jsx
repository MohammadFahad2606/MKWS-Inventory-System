export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-[--background] text-center rounded-2xl border border-[--border] shadow-sm">
      {/* Icon / Illustration */}
      <div className="text-6xl mb-4">🔍</div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-[--foreground]">
        No Products Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-[--mutedForeground]">
        We couldn’t find any products matching your search.  
        Try adjusting your filters or adding a new product.
      </p>

      {/* Button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-3 rounded-xl bg-[--accent] text-[--accentForeground] font-medium shadow hover:shadow-md transition"
      >
        Refresh
      </button>
    </div>
  );
}
