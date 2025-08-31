import React from 'react';
import { Dialog } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export default function ProductDetailModal({
  open,
  toggle,
  product,
  onEdit,
  onDelete,
  onTransaction,
}) {
  const navigate = useNavigate();
  if (!product) return null;

  // Calculate totals
  const totalIn =
    product.transactions
      ?.filter((t) => t.type === 'IN')
      .reduce((sum, t) => sum + t.amount, 0) || 0;
  const totalOut =
    product.transactions
      ?.filter((t) => t.type === 'OUT')
      .reduce((sum, t) => sum + t.amount, 0) || 0;
  const inHand = totalIn - totalOut;

  const handleTransaction = () => {
    toggle();
    navigate(`/dashboard/transactions/${product._id}`);
    if (onTransaction) onTransaction(product);
  };

  return (
    <Dialog
      open={open}
      size="sm"
      handler={toggle}
      className="relative w-full max-w-md rounded-xl p-6 shadow-lg"
      style={{
        background: 'var(--color-background)',
        color: 'var(--color-text)',
      }}
    >
      {/* Close Button */}
      <button
        onClick={toggle}
        className="absolute right-3 top-3 text-xl font-bold"
        style={{ color: 'var(--color-mutedForeground)' }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = 'var(--color-error)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = 'var(--color-mutedForeground)')
        }
      >
        &times;
      </button>

      {/* Product Info */}
      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold"
          style={{
            background: 'var(--color-primary)',
            color: 'var(--color-primaryForeground)',
          }}
        >
          {product.name?.charAt(0) || '?'}
        </div>
        <div>
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            {product.name}
          </h2>
          <p
            className="text-sm"
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            PID: {product.productId}
          </p>
          <p
            className="text-sm"
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            Buy Rate: {product.buyRate}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>
          Description
        </h3>
        <p
          className="text-sm"
          style={{ color: 'var(--color-mutedForeground)' }}
        >
          {product.description || '-'}
        </p>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr
              className="font-semibold"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-primaryForeground)',
              }}
            >
              <td className="p-2">Total In</td>
              <td className="p-2 text-right">{totalIn} pcs</td>
            </tr>
            <tr>
              <td className="p-2">Total Out</td>
              <td className="p-2 text-right">{totalOut} pcs</td>
            </tr>
            <tr
              style={{
                background: 'var(--color-mutedForeground)',
                color: 'var(--color-text)',
              }}
            >
              <td className="p-2">In Hand</td>
              <td className="p-2 text-right">{inHand} pcs</td>
            </tr>
            <tr>
              <td className="p-2">Stock Price</td>
              <td className="p-2 text-right">{inHand * product.buyRate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => onDelete(product._id)}
          className="rounded px-4 py-2 font-semibold"
          style={{
            background: 'var(--color-error)',
            color: 'var(--color-primaryForeground)',
          }}
        >
          DEL
        </button>
        <button
          onClick={() => onEdit(product)}
          className="rounded px-4 py-2 font-semibold"
          style={{
            background: 'var(--color-warning)',
            color: 'var(--color-text-on-warning)',
          }}
        >
          EDIT
        </button>
        <button
          onClick={handleTransaction}
          className="rounded px-4 py-2 font-semibold"
          style={{
            background: 'var(--color-success)',
            color: 'var(--color-primaryForeground)',
          }}
        >
          TRANSACTIONS
        </button>
      </div>
    </Dialog>
  );
}