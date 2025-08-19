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
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
    <div className="p-4">
      <Typography variant="h4" className="mb-4">
        Stock In/Out
      </Typography>

      {error && <p className="text-red-500">{error}</p>}

      {/* Date */}
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
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
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
                  <td className="border px-4 py-2">{p.initialQuantity}</td>
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

      {/* In/Out */}
      <div className="mb-4">
        <Typography>Type:</Typography>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <Radio
              name="stockType"
              value="in"
              checked={stockType === "in"}
              onChange={() => setStockType("in")}
              label="Stock In"
            />
          </label>
          <label className="flex items-center gap-2">
            <Radio
              name="stockType"
              value="out"
              checked={stockType === "out"}
              onChange={() => setStockType("out")}
              label="Stock Out"
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
  );
}
