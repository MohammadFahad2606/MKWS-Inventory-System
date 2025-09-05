import { Routes, Route, Navigate } from 'react-router-dom'; 
import { Dashboard, Auth } from '@/layouts';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = localStorage.getItem("token");

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

        {/* ✅ Auth routes */}
        <Route path="/auth/*" element={<Auth />} />

        {/* ✅ Agar user "/" aaye */}
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard/home" : "/auth/sign-in"} replace />}
        />

        {/* ✅ Agar "/auth" ya invalid "/auth/*" aaye */}
        <Route
          path="/auth"
          element={<Navigate to="/auth/sign-in" replace />}
        />

        {/* ✅ Agar "/dashboard" ya invalid "/dashboard/*" aaye */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Navigate to="/dashboard/home" replace />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />

        {/* ✅ Baaki sab unknown routes */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard/home" : "/auth/sign-in"} replace />}
        />
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







// import { Routes, Route, Navigate } from 'react-router-dom';
// import { Dashboard, Auth } from '@/layouts';
// import ProtectedRoute from '@/routes/ProtectedRoute'; // ✅ import
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   return (
//     <>
//       <Routes>
//         {/* ✅ Dashboard ko protect karo */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Auth routes public rahenge */}
//         <Route path="/auth/*" element={<Auth />} />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//       </Routes>

//       {/* Toast notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick
//         pauseOnHover
//         draggable
//       />
//     </>
//   );
// }

// export default App;
