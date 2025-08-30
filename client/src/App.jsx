import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, Auth } from '@/layouts';
import ProtectedRoute from '@/routes/ProtectedRoute'; // ✅ import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        {/* ✅ Dashboard ko protect karo */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Auth routes public rahenge */}
        <Route path="/auth/*" element={<Auth />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default App;

// import { Routes, Route, Navigate } from "react-router-dom";
// import { Dashboard, Auth } from "@/layouts";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   return (
//     <>

//     <Routes>
//       <Route path="/dashboard/*" element={<Dashboard />} />
//       <Route path="/auth/*" element={<Auth />} />
//       <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//     </Routes>

// {/* Your routes/components */}
// <ToastContainer
//   position="top-right"
//   autoClose={3000}
//   hideProgressBar={false}
//   newestOnTop={true}
//   closeOnClick
//   pauseOnHover
//   draggable
// />
// </>
//   );
// }

// export default App;
