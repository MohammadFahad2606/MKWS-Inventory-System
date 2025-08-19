
import React from "react";
import { Button, Typography } from "@material-tailwind/react";

export function ProductList({ products, onShow }) {
  if (!products.length) return <Typography>No products yet.</Typography>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Product ID</th>
            <th className="border px-4 py-2">Buy Rate</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.productId}</td>
              <td className="border px-4 py-2">{p.buyRate}</td>
              <td className="border px-4 py-2">{p.initialQuantity}</td>
              <td className="border px-4 py-2">{p.description}</td>
              <td className="border px-4 py-2">
                <Button color="blue" size="sm" onClick={() => onShow(p)}>
                  Show
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
