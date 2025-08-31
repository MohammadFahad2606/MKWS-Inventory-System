import { updateTransactionById } from "@/redux/productSlice";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TransactionModal({ transaction, onClose, transactionId }) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);

  function formatDateForInput(dateString) {
    return new Date(dateString);
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: transaction.type,
      date: formatDateForInput(transaction.date),
      amount: transaction.amount,
      remark: transaction.remark,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      date: new Date(data.date).toISOString(), // backend ke liye ISO
    };

    try {
      await dispatch(updateTransactionById({ transactionId, data: payload })).unwrap();
      toast.success("Transaction updated successfully!");
      onClose();
    } catch (err) {
      toast.error(err || "Failed to update transaction");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="p-6 rounded-2xl w-96 shadow-2xl"
        style={{
          backgroundColor: "var(--color-card)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--color-foreground)" }}
        >
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Type */}

          {/* Type */}
<div className="mb-4">
  <p
    style={{ color: "var(--color-foreground)" }}
    className="text-sm font-medium mb-2"
  >
    Type:
  </p>
  <Controller
    control={control}
    name="type"
    rules={{ required: "Type is required" }}
    render={({ field }) => (
      <div className="flex gap-4 mt-2">
        {/* Stock In Button */}
        <button
          type="button"
          onClick={() => field.onChange("IN")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            field.value === "IN"
              ? "bg-[var(--color-success)] text-[var(--color-cardForeground)]"
              : "bg-[var(--color-mutedForeground)] text-[var(--color-foreground)] hover:bg-[var(--color-success)]/20"
          }`}
        >
          Stock In
        </button>

        {/* Stock Out Button */}
        <button
          type="button"
          onClick={() => field.onChange("OUT")}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            field.value === "OUT"
              ? "bg-[var(--color-destructive)] text-[var(--color-cardForeground)]"
              : "bg-[var(--color-mutedForeground)] text-[var(--color-foreground)] hover:bg-[var(--color-destructive)]/20"
          }`}
        >
          Stock Out
        </button>
      </div>
    )}
  />
  {errors.type && (
    <p style={{ color: "var(--color-destructive)" }} className="text-xs mt-1">
      {errors.type.message}
    </p>
  )}
</div>


          {/* Date & Time */}
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-foreground)" }}
            >
              Date & Time
            </label>
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full rounded p-2"
                  style={{
                    border: "1px solid var(--color-input)",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-foreground)",
                  }}
                />
              )}
            />
            {errors.date && (
              <p style={{ color: "var(--color-destructive)" }} className="text-xs">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-foreground)" }}
            >
              Amount
            </label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be > 0" },
              })}
              className="w-full rounded p-2"
              style={{
                border: "1px solid var(--color-input)",
                backgroundColor: "var(--color-card)",
                color: "var(--color-foreground)",
              }}
            />
            {errors.amount && (
              <p style={{ color: "var(--color-destructive)" }} className="text-xs">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Remark */}
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              style={{ color: "var(--color-foreground)" }}
            >
              Remark
            </label>
            <input
              type="text"
              {...register("remark")}
              className="w-full rounded p-2"
              style={{
                border: "1px solid var(--color-input)",
                backgroundColor: "var(--color-card)",
                color: "var(--color-foreground)",
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-secondaryForeground)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primaryForeground)",
              }}
            >
              Save
            </button>
          </div>
        </form>
        {error && (
          <p style={{ color: "var(--color-destructive)" }} className="text-xs">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
