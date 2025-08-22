import React from "react";
import { Input } from "@material-tailwind/react";

export default function DateTimeInput({ date, setDate, setManual }) {
  return (
    <div className="mb-4">
      <label style={{ color: "var(--color-muted)" }}>Date & Time:</label>
      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setManual(true);
        }}
        className="!border !rounded-md"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-muted)",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}
