import { Select, Option } from '@material-tailwind/react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TransactionFilter({
  items,
  selectedProduct,
  setSelectedProduct,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleGet,
  handleClear,
}) {
  return (
    <div
      className="mb-6 rounded-2xl p-6 shadow-md"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="grid grid-cols-4 items-end gap-4">
        {/* Product Select */}
        <div>
          <Select
            label="Product"
            className="mt-1 w-full cursor-pointer rounded-lg px-3 py-2 shadow-sm"
            style={{
              color: 'var(--color-foreground)',
              background: 'var(--color-surface)',
            }}
            value={selectedProduct}
            onChange={(value) => setSelectedProduct(value)} // <-- value is directly returned
          >
            {items.map((p) => (
              <Option key={p._id} value={p.name}>
                {p.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* From Date */}
        <div>
          <label
            className="font-semibold"
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            From
          </label>
          <DatePicker
            selected={fromDate ? new Date(fromDate) : null}
            onChange={(date) => setFromDate(date)}
            className="mt-1 w-full rounded-lg px-3 py-2 shadow-sm"
            placeholderText="Select From Date"
            dateFormat="yyyy-MM-dd"
            style={{
              borderColor: 'var(--color-mutedForeground)',
              color: 'var(--color-foreground)',
              background: 'var(--color-background)',
            }}
          />
        </div>

        {/* To Date */}
        <div>
          <label
            className="font-semibold"
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            To
          </label>
          <DatePicker
            selected={toDate ? new Date(toDate) : null}
            onChange={(date) => setToDate(date)}
            className="mt-1 w-full rounded-lg px-3 py-2 shadow-sm"
            placeholderText="Select To Date"
            dateFormat="yyyy-MM-dd"
            style={{
              borderColor: 'var(--color-mutedForeground)',
              color: 'var(--color-foreground)',
              background: 'var(--color-background)',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            className="flex-1 rounded-lg px-4 py-2 font-semibold shadow"
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-background)',
            }}
            onClick={handleGet}
          >
            Get
          </button>
          <button
            className="flex-1 rounded-lg px-4 py-2 font-semibold shadow"
            style={{
              background: 'var(--color-destructive)',
              color: 'var(--color-text-on-destructive)',
            }}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
