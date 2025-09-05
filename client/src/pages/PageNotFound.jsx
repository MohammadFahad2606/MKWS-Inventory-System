import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[--background] text-[--foreground] px-6">
      <div className="text-center max-w-lg">
        {/* 404 number */}
        <h1 className="text-8xl font-extrabold text-[--primary]">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-[--foreground]">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-[--mutedForeground]">
          Sorry, we couldn’t find the page you’re looking for.  
          It might have been removed, renamed, or did not exist in the first place.
        </p>

        {/* Back button */}
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-[--accent] text-[--accentForeground] font-medium shadow hover:shadow-md transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
