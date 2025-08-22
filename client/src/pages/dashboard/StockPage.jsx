
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
