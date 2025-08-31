import React from "react";
import { Input, Textarea } from "@material-tailwind/react";

export default function QuantityRemark({ quantity, setQuantity, remark, setRemark }) {
  return (
    <div className="mb-4 flex gap-2">
      <Input
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="!border !rounded-md"
        style={{
         background: "var(--color-background)",
          borderColor: "var(--color-foreground)",
          color: "var(--color-foreground)",
        }}
      />
      <Textarea
        label="Remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        className="!border !rounded-md"
        style={{
          background: "var(--color-background)",
          borderColor: "var(--color-foreground)",
          color: "var(--color-foreground)",
        }}
      />
    </div>
  );
}
