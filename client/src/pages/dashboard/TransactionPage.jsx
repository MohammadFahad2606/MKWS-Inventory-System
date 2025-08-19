// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Typography, Button } from "@material-tailwind/react";
// import { fetchProducts } from "../../redux/productSlice";

// export default function TransactionPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { items, loading, error } = useSelector((state) => state.products);

//   // find the product in Redux store
//   const product = items.find((p) => p._id === productId);

//   useEffect(() => {
//     if (!items.length) {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, items.length]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="red">{error}</Typography>;
//   if (!product) return <Typography>Product not found</Typography>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-6">
//         <Typography variant="h4" className="font-bold">
//           Transactions for: {product.name}
//         </Typography>
//         <Button color="blue" onClick={() => navigate(-1)}>
//           Back
//         </Button>
//       </div>

//       {product.transactions.length === 0 ? (
//         <Typography>No transactions found.</Typography>
//       ) : (
//         <table className="min-w-full border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Type</th>
//               <th className="border px-4 py-2">Amount</th>
//               <th className="border px-4 py-2">Remark</th>
//               <th className="border px-4 py-2">Date</th>
//               <th className="border px-4 py-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {product.transactions.map((t, idx) => (
//               <tr key={idx} className="text-center">
//                 <td className="border px-4 py-2">{t.type}</td>
//                 <td className="border px-4 py-2">{t.amount}</td>
//                 <td className="border px-4 py-2">{t.remark || "-"}</td>
//                 <td className="border px-4 py-2">{new Date(t.date).toLocaleString()}</td>
//                 <td className="border px-4 py-2">{new Date(t.createdAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@material-tailwind/react";
import { fetchProducts } from "../../redux/productSlice";

export default function TransactionPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="red">{error}</Typography>;

  let transactions = [];

  if (productId) {
    // product-specific transactions
    const product = items.find((p) => p._id === productId);
    if (!product) return <Typography>Product not found</Typography>;
    transactions = product.transactions.map((t) => ({
      ...t,
      productName: product.name,
    }));
  } else {
    // last 15 transactions all products
    transactions = items.flatMap((p) =>
      p.transactions.map((t) => ({
        ...t,
        productName: p.name,
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 15);
  }



if(productId) {
  // show only this product's transactions
} else {
  // show last 15 transactions
}


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">
          {productId ? `Transactions for: ${transactions[0]?.productName || ""}` : "Last 15 Transactions"}
        </Typography>
        <Button color="blue" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {transactions.length === 0 ? (
        <Typography>No transactions found.</Typography>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-center">
              {!productId && <th className="border px-4 py-2">Product</th>}
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Remark</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={idx} className="text-center">
                {!productId && <td className="border px-4 py-2">{t.productName}</td>}
                <td className="border px-4 py-2">{t.type}</td>
                <td className="border px-4 py-2">{t.amount}</td>
                <td className="border px-4 py-2">{t.remark || "-"}</td>
                <td className="border px-4 py-2">{new Date(t.date).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
