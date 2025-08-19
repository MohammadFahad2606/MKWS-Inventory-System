import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Textarea,
  Radio,
  RadioGroup,
} from "@material-tailwind/react";
const Test = () => {

      // Dummy product list
  const dummyProducts = [
    { _id: "1", name: "Paracetamol 500mg", productId: "PCM-500", buyRate: 2.75 },
    { _id: "2", name: "Amoxicillin 250mg", productId: "AMX-250", buyRate: 5.0 },
    { _id: "3", name: "Ibuprofen 200mg", productId: "IBU-200", buyRate: 3.25 },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockType, setStockType] = useState("in"); // "in" or "out"
  const [quantity, setQuantity] = useState(0);
  const [remark, setRemark] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); // YYYY-MM-DDTHH:mm

  const [search, setSearch] = useState("");

  const handleSave = () => {
    if (!selectedProduct || quantity <= 0) {
      return alert("Select product & quantity");
    }
    alert(`
      ✅ Transaction Saved!
      Product: ${selectedProduct.name}
      Type: ${stockType}
      Quantity: ${quantity}
      Date: ${date}
      Remark: ${remark}
    `);

    setQuantity(0);
    setRemark("");
    setSelectedProduct(null);
  };

  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className="p-4">
    <Typography variant="h4" className="mb-4">
      Stock In/Out
    </Typography>

    {/* Date & Time */}
    <div className="mb-4">
      <label>Date & Time:</label>
      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    {/* Search */}
     <div className="mb-4">
      <Input
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Product List */}
   
     <div className="mb-4 overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Buy Rate</th>
            <th className="border px-4 py-2">Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p._id} className="text-center">
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.productId}</td>
                <td className="border px-4 py-2">{p.buyRate}</td>
                <td className="border px-4 py-2">
                  <input
                    type="radio"
                    name="selectedProduct"
                    checked={selectedProduct?._id === p._id}
                    onChange={() => setSelectedProduct(p)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* In/Out Toggle */}
    <div className="mb-4">
  <label className="block font-medium mb-2">Type:</label>
  <div className="flex gap-6">
    <Radio
      name="stockType"
      label="Stock In"
      value="in"
      checked={stockType === "in"}
      onChange={() => setStockType("in")}
    />
    <Radio
      name="stockType"
      label="Stock Out"
      value="out"
      checked={stockType === "out"}
      onChange={() => setStockType("out")}
    />
  </div>
</div>


    {/* Quantity & Remark */}
    <div className="mb-4 flex gap-2">
      <Input
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Textarea
        label="Remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
    </div>

    <Button color="green" onClick={handleSave}>
      Save
    </Button> 
  </div>
  </>
  )
}

export default Test