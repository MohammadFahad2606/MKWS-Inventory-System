import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Textarea,
  Radio,
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
    <div className="p-4 bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen">
      <Typography variant="h4" className="mb-4 text-[var(--color-text)]">
        Stock In/Out
      </Typography>

      {/* Date & Time */}
      <div className="mb-4">
        <label className="text-[var(--color-muted)]">Date & Time:</label>
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="!text-[var(--color-text)]"
        />
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!text-[var(--color-text)]"
        />
      </div>

      {/* Product List */}
      <div className="mb-4 overflow-x-auto">
        <table className="min-w-full border-collapse border border-[var(--color-muted)] shadow-[var(--shadow-elev-1)]">
          <thead>
            <tr className="bg-[var(--color-surface)]">
              <th className="border border-[var(--color-muted)] px-4 py-2 text-[var(--color-text)]">Name</th>
              <th className="border border-[var(--color-muted)] px-4 py-2 text-[var(--color-text)]">Product ID</th>
              <th className="border border-[var(--color-muted)] px-4 py-2 text-[var(--color-text)]">Buy Rate</th>
              <th className="border border-[var(--color-muted)] px-4 py-2 text-[var(--color-text)]">Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-[var(--color-muted)]">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr
                  key={p._id}
                  className="text-center hover:bg-[var(--color-surface)] transition"
                >
                  <td className="border border-[var(--color-muted)] px-4 py-2">{p.name}</td>
                  <td className="border border-[var(--color-muted)] px-4 py-2">{p.productId}</td>
                  <td className="border border-[var(--color-muted)] px-4 py-2">{p.buyRate}</td>
                  <td className="border border-[var(--color-muted)] px-4 py-2">
                    <input
                      type="radio"
                      name="selectedProduct"
                      checked={selectedProduct?._id === p._id}
                      onChange={() => setSelectedProduct(p)}
                      className="accent-[var(--color-primary)]"
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
        <label className="block font-medium mb-2 text-[var(--color-muted)]">Type:</label>
        <div className="flex gap-6">
          <Radio
            name="stockType"
            label="Stock In"
            value="in"
            checked={stockType === "in"}
            onChange={() => setStockType("in")}
            className="text-[var(--color-primary)]"
          />
          <Radio
            name="stockType"
            label="Stock Out"
            value="out"
            checked={stockType === "out"}
            onChange={() => setStockType("out")}
            className="text-[var(--color-primary)]"
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
          className="!text-[var(--color-text)]"
        />
        <Textarea
          label="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="!text-[var(--color-text)]"
        />
      </div>

      <Button
        className="!bg-[var(--color-primary)] !text-[var(--color-text-on-primary)] hover:!bg-[var(--color-primary-hover)] shadow-[var(--shadow-elev-1)]"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default Test;
