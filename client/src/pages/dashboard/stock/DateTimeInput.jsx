import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // base styles, we will override

export default function DateTimeInput({ date, setDate, setManual }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 w-full " >
      <label className="block  mb-1 text-[var(--color-mutedForeground)]">
        Date & Time:
      </label>

     <div className="-500 flex items-center text-center ">
       <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(d) => {
          setDate(d.toISOString().slice(0, 16)); // keep datetime-local format
          setManual(true);
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        className="
          rounded-md
          border
          px-3
          py-2
          text-[var(--color-foreground)]
          bg-[var(--color-card)]
          border-[var(--color-mutedForeground)]
          focus:outline-none
          placeholder:text-[var(--color-mutedForeground)]
          w-full
          hover:border-[var(--color-foreground)]
          hover:border-2
          focus:border-[var(--color-foreground)]
          cursor-pointer
          -z-100
        "
        portalId="root-portal"
        onCalendarOpen={() => setOpen(true)}
        onCalendarClose={() => setOpen(false)}
        calendarClassName="
          bg-[var(--color-card)] 
          border-[var(--color-mutedForeground)] 
          text-[var(--color-foreground)]
        "
        dayClassName={() => "text-[var(--color-foreground)]"}
        timeClassName={() => "text-[var(--color-foreground)]"}
      />
     </div>
    </div>
  );
}
