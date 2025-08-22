// src/pages/products/ProductList.jsx
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState, useMemo } from "react";
import { set } from "react-hook-form";

export default function ProductList({ products, onShow }) {
  const [search, setSearch] = useState("");
  // console.log(products)
  // ✅ Filter products by search text
  const filteredItems = useMemo(() => {
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.productId?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // ✅ Calculate totals (on filtered items)
  const { totalStock, totalPrice } = useMemo(() => {
    let stock = 0;
    let price = 0;
  

    filteredItems.forEach((product) => {
  
      const totalIn =
        product.transactions
          ?.filter((t) => t.type === "IN")
          .reduce((sum, t) => sum + t.amount, 0) || 0;

      const totalOut =
        product.transactions
          ?.filter((t) => t.type === "OUT")
          .reduce((sum, t) => sum + t.amount, 0) || 0;

      const inHand = totalIn - totalOut;

      stock += inHand;
      price += inHand * product.buyRate;
    });

    return { totalStock: stock, totalPrice: price };
  }, [filteredItems]);




  if (!products.length) {
    return <p style={{ color: "var(--color-muted)" }}>No products yet.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
      />

      {/* 📊 Totals */}
      <div className="p-4 rounded-lg shadow bg-[var(--color-surface)]">
        <p className="font-semibold text-[var(--color-text)]">
          Total stock in hand:{" "}
          <span className="text-[var(--color-primary)]">{totalStock} pcs</span>
        </p>
        <p className="font-semibold text-[var(--color-text)]">
          Total stock price:{" "}
          <span className="text-[var(--color-primary)]">PKR : {totalPrice}</span>
        </p>
      </div>

      {/* 🧾 Product List */}
      <div className="space-y-2">
        {filteredItems.map((product) => {
          const totalIn =
            product.transactions
              ?.filter((t) => t.type === "IN")
              .reduce((sum, t) => sum + t.amount, 0) || 0;

          const totalOut =
            product.transactions
              ?.filter((t) => t.type === "OUT")
              .reduce((sum, t) => sum + t.amount, 0) || 0;

          const inHand = totalIn - totalOut;

          return (
            <div
              key={product._id}
              className="p-3 border rounded-lg flex justify-between items-center hover:shadow-md transition"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-text)",
              }}
            >
              <div>
                <p className="font-semibold">{product.name} - {product.productId}</p>
                <p className="text-sm text-[var(--color-muted)]">
                  In hand: {inHand} pcs X {product.buyRate}
                </p>
                <p className="flex items-center text-sm text-[var(--color-muted)]">
                  <ChevronUpIcon className="h-4 w-4 " /> {totalIn} 
                   <ChevronDownIcon className="h-4 w-4" />{totalOut}
                  

                
                </p>
                <p className="font-semibold text-[var(--color-primary-text)]">
                  Total:  {inHand * product.buyRate} ᴾᴷᴿ
                </p>
              </div>
              <div className="flex items-center gap-3">

                {onShow && (
                  <button
                    onClick={() => onShow(product)}
                    className="px-3 py-1 rounded bg-[var(--color-sidebar-bg)] text-[var(--color-text-on-primary)]"
                  >
                    Option
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
