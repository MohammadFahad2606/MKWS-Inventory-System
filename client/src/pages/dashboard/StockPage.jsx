// import React, { useEffect, useState } from "react";
// import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
// import { useDispatch, useSelector } from "react-redux";
// import { addStock, fetchProducts } from "../../redux/productSlice";
// import { Alert } from "@material-tailwind/react";

// export default function StockPage() {
//   const dispatch = useDispatch();
//   const { items: products, loading, error } = useSelector((state) => state.products);

//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [stockType, setStockType] = useState("in");
//   const [quantity, setQuantity] = useState(0);
//   const [remark, setRemark] = useState("");
//   const [date, setDate] = useState("");
//   const [manual, setManual] = useState(false);
//   const [search, setSearch] = useState("");

//   const [alert, setAlert] = useState({ show: false, type: "success", message: "" });

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Auto date/time unless user selects manually
//   useEffect(() => {
//     const updateDate = () => {
//       if (!manual) {
//         const now = new Date();
//         const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
//           .toISOString()
//           .slice(0, 16);
//         setDate(local);
//       }
//     };
//     updateDate();
//     const interval = setInterval(updateDate, 1000);
//     return () => clearInterval(interval);
//   }, [manual]);

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//     setManual(true);
//   };

//   // Handle Save with Alert
//   const handleSave = () => {
//     if (!selectedProduct || quantity <= 0) {
//       setAlert({ show: true, type: "red", message: "Select product & quantity" });
//        setTimeout(() => setAlert({ ...alert, show: false }), 3000);
//       return;
//     }

//     dispatch(
//       addStock({
//         id: selectedProduct._id,
//         type: stockType,
//         quantity,
//         date,
//         remark,
//       })
//     );

//     setQuantity(0);
//     setRemark("");
//     setSelectedProduct(null);
//     setManual(false);

//     setAlert({ show: true, type: "green", message: "Stock saved successfully!" });

//     // Auto hide after 3s
//     setTimeout(() => setAlert({ ...alert, show: false }), 3000);
//   };

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-4" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
//       <Typography variant="h4" className="mb-4" style={{ color: "var(--color-primary)" }}>
//         Stock In/Out
//       </Typography>

//       {/* Toast Alert */}
//       {alert.show && (
//         <div className="fixed top-4 right-4 z-50">
//           <Alert color={alert.type} className="shadow-lg">
//             {alert.message}
//           </Alert>
//         </div>
//       )}
//       {/* Search */}
//       <div className="mb-4">
//         <Input
//           placeholder="Search Product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="!border !rounded-md"
//           style={{
//             background: "var(--color-surface)",
//             borderColor: "var(--color-muted)",
//             color: "var(--color-text)",
//           }}
//         />
//       </div>

//       {/* Product List */}
//       <div className="mb-4 overflow-x-auto">
//         <div className="min-w-[600px] max-h-[220px] overflow-y-auto">
//           <table className="min-w-full border-collapse" style={{ borderColor: "var(--color-muted)" }}>
//             <thead>
//               <tr style={{ background: "var(--color-surface)" }}>
//                 <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Name</th>
//                 <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Product ID</th>
//                 <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Buy Rate</th>
//                 <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Quantity</th>
//                 <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Select</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="text-center">Loading...</td>
//                 </tr>
//               ) : filteredProducts.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center">No products found</td>
//                 </tr>
//               ) : (
//                 filteredProducts.map((p) => (
//                   <tr key={p._id} className="text-center" style={{ background: "var(--color-surface)" }}>
//                     <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.name}</td>
//                     <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.productId}</td>
//                     <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.buyRate}</td>
//                     <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.initialQuantity}</td>
//                     <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
//                       <input
//                         type="radio"
//                         name="selectedProduct"
//                         checked={selectedProduct?._id === p._id}
//                         onChange={() => setSelectedProduct(p)}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Conditional Fields */}
//       {selectedProduct && (
//         <>
//           {/* In/Out Tabs */}
//           <div className="mb-4">
//             <Typography style={{ color: "var(--color-text)" }}>Type:</Typography>
//             <div className="flex gap-4 mt-2">
//               <button
//                 type="button"
//                 onClick={() => setStockType("in")}
//                 className={`px-6 py-2 rounded-lg font-semibold transition-colors ${stockType === "in" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-100"
//                   }`}
//               >
//                 Stock In
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setStockType("out")}
//                 className={`px-6 py-2 rounded-lg font-semibold transition-colors ${stockType === "out" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-red-100"
//                   }`}
//               >
//                 Stock Out
//               </button>
//             </div>
//           </div>

//           {/* Date & Time */}
//           <div className="mb-4">
//             <label style={{ color: "var(--color-muted)" }}>Date & Time:</label>
//             <Input
//               type="datetime-local"
//               value={date}
//               onChange={(e) => { setDate(e.target.value); setManual(true); }}
//               className="!border !rounded-md"
//               style={{
//                 background: "var(--color-surface)",
//                 borderColor: "var(--color-muted)",
//                 color: "var(--color-text)",
//               }}
//             />
//           </div>

//           {/* Quantity + Remark */}
//           <div className="mb-4 flex gap-2">
//             <Input
//               type="number"
//               label="Quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               className="!border !rounded-md"
//               style={{
//                 background: "var(--color-surface)",
//                 borderColor: "var(--color-muted)",
//                 color: "var(--color-text)",
//               }}
//             />
//             <Textarea
//               label="Remark"
//               value={remark}
//               onChange={(e) => setRemark(e.target.value)}
//               className="!border !rounded-md"
//               style={{
//                 background: "var(--color-surface)",
//                 borderColor: "var(--color-muted)",
//                 color: "var(--color-text)",
//               }}
//             />
//           </div>

//           {/* Save Button */}
//           <Button
//             onClick={handleSave}
//             style={{
//               background: "var(--color-primary)",
//               color: "var(--color-text-on-primary)",
//             }}
//           >
//             Save
//           </Button>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addStock, fetchProducts } from "../../redux/productSlice";

import ToastAlert from "./stock/ToastAlert";
import StockSearch from "./stock/StockSearch";
import ProductTable from "./stock/ProductTable";
import StockTypeTabs from "./stock/StockTypeTabs";
import DateTimeInput from "./stock/DateTimeInput";
import QuantityRemark from "./stock/QuantityRemark";

export default function StockPage() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockType, setStockType] = useState("in");
  const [quantity, setQuantity] = useState(0);
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState("");
  const [manual, setManual] = useState(false);
  const [search, setSearch] = useState("");

  const [alert, setAlert] = useState({ show: false, type: "success", message: "" });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Auto date/time unless manual
  useEffect(() => {
    const updateDate = () => {
      if (!manual) {
        const now = new Date();
        const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setDate(local);
      }
    };
    updateDate();
    const interval = setInterval(updateDate, 1000);
    return () => clearInterval(interval);
  }, [manual]);

  const handleSave = () => {
    if (!selectedProduct || quantity <= 0) {
      setAlert({ show: true, type: "red", message: "Select product & quantity" });
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
      return;
    }

    dispatch(addStock({ id: selectedProduct._id, type: stockType, quantity, date, remark }));

    setQuantity(0);
    setRemark("");
    setSelectedProduct(null);
    setManual(false);

    setAlert({ show: true, type: "green", message: "Stock saved successfully!" });
    setTimeout(() => setAlert({ ...alert, show: false }), 3000);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Typography variant="h4" className="mb-4" style={{ color: "var(--color-primary)" }}>
        Stock In/Out
      </Typography>

      <ToastAlert alert={alert} />

      {/* Search */}
      <StockSearch search={search} setSearch={setSearch} />

      {/* Product List */}
      <ProductTable
        products={filteredProducts}
        loading={loading}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      {/* Conditional Fields */}
      {selectedProduct && (
        <>
          <StockTypeTabs stockType={stockType} setStockType={setStockType} />

          <DateTimeInput date={date} setDate={setDate} setManual={setManual} />

          <QuantityRemark
            quantity={quantity}
            setQuantity={setQuantity}
            remark={remark}
            setRemark={setRemark}
          />

          <Button
            onClick={handleSave}
            style={{ background: "var(--color-primary)", color: "var(--color-text-on-primary)" }}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
}
