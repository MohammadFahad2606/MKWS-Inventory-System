import React, { useEffect, useState } from "react";
import {
  Typography,
  Input,
  Button,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addStock } from "../../redux/productSlice";

export default function StockPage() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockType, setStockType] = useState("in");
  const [quantity, setQuantity] = useState(0);
  const [remark, setRemark] = useState("");
const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Har 1 second me current local datetime set karo
    const updateDate = () => {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDate(local);
    };

    updateDate(); // initial load
    const interval = setInterval(updateDate, 1000); // har second update

    return () => clearInterval(interval); // cleanup
  }, []);


  const handleSave = () => {
    if (!selectedProduct || quantity <= 0) {
      return alert("Select product & quantity");
    }
    dispatch(
      addStock({
        id: selectedProduct._id,
        type: stockType,
        quantity,
        date,
        remark,
      })
    );
    setQuantity(0);
    setRemark("");
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Typography variant="h4" className="mb-4" style={{ color: "var(--color-primary)" }}>
        Stock In/Out
      </Typography>

      {error && <p style={{ color: "var(--color-error, red)" }}>{error}</p>}

      {/* Date */}
      <div className="mb-4">
        <label style={{ color: "var(--color-muted)" }}>Date & Time:</label>
        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="!border !rounded-md"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-muted)",
            color: "var(--color-text)",
          }}
        />
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="!border !rounded-md"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-muted)",
            color: "var(--color-text)",
          }}
        />
      </div>

      {/* Product List */}
      <div className="mb-4 overflow-x-auto">
        <table
          className="min-w-full border-collapse"
          style={{ borderColor: "var(--color-muted)" }}
        >
          <thead>
            <tr style={{ background: "var(--color-surface)" }}>
              <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Name</th>
              <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Product ID</th>
              <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Buy Rate</th>
              <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Quantity</th>
              <th className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p._id} className="text-center" style={{ background: "var(--color-surface)" }}>
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.name}</td>
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.productId}</td>
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.buyRate}</td>
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>{p.initialQuantity}</td>
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
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

      {/* In/Out */}
      <div className="mb-4">
        <Typography style={{ color: "var(--color-text)" }}>Type:</Typography>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <Radio
              name="stockType"
              value="in"
              checked={stockType === "in"}
              onChange={() => setStockType("in")}
              label="Stock In"
              className="text-[var(--color-primary)]"
            />
          </label>
          <label className="flex items-center gap-2">
            <Radio
              name="stockType"
              value="out"
              checked={stockType === "out"}
              onChange={() => setStockType("out")}
              label="Stock Out"
              className="text-[var(--color-primary)]"
            />
          </label>
        </div>
      </div>

      {/* Quantity + Remark */}
      <div className="mb-4 flex gap-2">
        <Input
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="!border !rounded-md"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-muted)",
            color: "var(--color-text)",
          }}
        />
        <Textarea
          label="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="!border !rounded-md"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-muted)",
            color: "var(--color-text)",
          }}
        />
      </div>

      <Button
        onClick={handleSave}
        style={{
          background: "var(--color-primary)",
          color: "var(--color-text-on-primary)",
        }}
      >
        Save
      </Button>
    </div>
  );
}
