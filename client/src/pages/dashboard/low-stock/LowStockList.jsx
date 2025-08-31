// import React from "react";

// export default function LowStockList({ products }) {
//   if (!products.length) {
//     return (
//       <p style={{ color: "var(--color-mutedForeground)" }}>
//         🎉 No low stock items found!
//       </p>
//     );
//   }

//   return (
//     <div className="space-y-3">
//       {products.map((product) => {
//         const totalIn =
//           product.transactions
//             ?.filter((t) => t.type === "IN")
//             .reduce((sum, t) => sum + t.amount, 0) || 0;

//         const totalOut =
//           product.transactions
//             ?.filter((t) => t.type === "OUT")
//             .reduce((sum, t) => sum + t.amount, 0) || 0;

//         const inHand = totalIn - totalOut;

//         return (
//           <div
//             key={product._id}
//             className="p-3 border rounded-lg flex justify-between items-center hover:shadow-md transition"
//             style={{
//               borderColor: "var(--color-border)",
//               background: "var(--color-card)",
//               color: "var(--color-foreground)",
//             }}
//           >
//             <div>
//               <p className="font-semibold">
//                 {product.name} - {product.productId}
//               </p>
//               <p className="text-sm text-[var(--color-mutedForeground)]">
//                 In hand: {inHand} pcs | Rate: {product.buyRate}
//               </p>
//               <p className="font-semibold text-[var(--color-primary)]">
//                 Value: {inHand * product.buyRate} PKR
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
