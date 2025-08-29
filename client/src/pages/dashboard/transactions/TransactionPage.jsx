

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/productSlice";

import TransactionHeader from "./TransactionHeader";
import ProductInfoCard from "./ProductInfoCard";
import TransactionFilter from "./TransactionFilter";
import TransactionList from "./TransactionList";
import TransactionPagination from "./TransactionPagination";
import ExportButtons from "./ExportButtons";

export default function TransactionPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [selectedProduct, setSelectedProduct] = useState(productId || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
// console.log(items)
  useEffect(() => {
    if (!items.length) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  useEffect(() => {
    let transactions = [];
    if (productId) {
      const product = items.find((p) => p._id === productId);
      if (product) {
        transactions = product.transactions.map((t) => ({
          ...t,
          productName: product.name,
          productId: p._id
        }));
      }
    } else {
      transactions = items.flatMap((p) =>
        p.transactions.map((t) => ({ ...t, productName: p.name ,productId: p._id }))
      );
    }
    if (!productId && selectedProduct) {
      transactions = transactions.filter(
        (t) => t.productName === selectedProduct
      );
    }
    if (fromDate) {
      const from = new Date(fromDate);
      from.setHours(0, 0, 0, 0);
      transactions = transactions.filter((t) => {
        const tDate = new Date(t.date);
        tDate.setHours(0, 0, 0, 0);
        return tDate >= from;
      });
    }
    if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      transactions = transactions.filter((t) => new Date(t.date) <= to);
    }
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredTransactions(transactions);
    setCurrentPage(1);
  }, [items, productId, selectedProduct, fromDate, toDate]);


  // console.log(filteredTransactions)
  const handleGet = () => setSelectedProduct(selectedProduct);
  const handleClear = () => {
    setSelectedProduct(productId || "");
    setFromDate("");
    setToDate("");
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const singleProduct = items.find((p) => p._id === productId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (productId && !singleProduct) return <p>Product not found</p>;

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <TransactionHeader
        title={productId ? "Product Transactions" : "All Transactions"}
      />

      <main className="max-w-5xl mx-auto p-6 space-y-6">

{/* 🔹 Export Buttons */}
      <ExportButtons transactions={filteredTransactions} type="transactions" />

    


        {singleProduct && <ProductInfoCard product={singleProduct} />}

        {!productId && (
          <TransactionFilter
            items={items}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            handleGet={handleGet}
            handleClear={handleClear}
          />
        )}

        <TransactionList transactions={currentTransactions} />

        <TransactionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
}
