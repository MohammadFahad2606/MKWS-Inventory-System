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
  if (error) return <Typography className="text-[var(--color-error)]">{error}</Typography>;

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
    transactions = items
      .flatMap((p) =>
        p.transactions.map((t) => ({
          ...t,
          productName: p.name,
        }))
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 15);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-[var(--color-text)]">
          {productId
            ? `Transactions for: ${transactions[0]?.productName || ""}`
            : "Last 15 Transactions"}
        </Typography>
        <Button
          style={{ backgroundColor: "var(--color-primary)", color: "var(--color-text-on-primary)" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      {transactions.length === 0 ? (
        <Typography className="text-[var(--color-muted)]">
          No transactions found.
        </Typography>
      ) : (
        <table
          className="min-w-full border"
          style={{ borderColor: "var(--color-muted)" }}
        >
          <thead style={{ backgroundColor: "var(--color-surface)" }}>
            <tr className="text-center text-[var(--color-text)]">
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
              <tr key={idx} className="text-center text-[var(--color-text)]">
                {!productId && (
                  <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                    {t.productName}
                  </td>
                )}
                <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                  {t.type}
                </td>
                <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                  {t.amount}
                </td>
                <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                  {t.remark || "-"}
                </td>
                <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                  {new Date(t.date).toLocaleString()}
                </td>
                <td className="border px-4 py-2" style={{ borderColor: "var(--color-muted)" }}>
                  {new Date(t.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
