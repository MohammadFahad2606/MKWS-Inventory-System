import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/auth/sign-in" replace />;

  try {
    const decoded = jwtDecode(token);

    // ✅ Check expiry from localStorage + token
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/auth/sign-in" replace />;
    }

    return children; // token valid hai
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/auth/sign-in" replace />;
  }
}

export default ProtectedRoute;
