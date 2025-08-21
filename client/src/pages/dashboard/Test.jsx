import { useState, useEffect } from "react";
import { Input } from "@material-tailwind/react";

function Test() {
  const [date, setDate] = useState("");

  useEffect(() => {
    // Har 1 second me current local datetime set karo
    const updateDate = () => {
      const now = new Date();
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setDate(local);
    };

    updateDate(); // initial load
    const interval = setInterval(updateDate, 1000); // har second update

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="mb-4">
      <label style={{ color: "var(--color-muted)" }}>Date & Time:</label>
      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
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

export default Test;
