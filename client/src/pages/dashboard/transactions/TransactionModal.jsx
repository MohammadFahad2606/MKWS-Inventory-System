import { updateTransactionById } from "@/redux/productSlice";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function TransactionModal({ transaction, onClose,transactionId }) {

  const dispatch = useDispatch();
  const error = useSelector((state) => state.products.error);

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: transaction.type,
      date: formatDateForInput(transaction.date),  // 👈 fixed
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
      toast.success("Transaction updated successfully!"); // ✅ success message
      onClose();
    } catch (err) {
      toast.error(err || "Failed to update transaction"); // ❌ error message
    }
  };
  

  // const onSubmit = (data) => {
  //   const payload = {
  //     ...data,
  //     date: new Date(data.date).toISOString(), // 👈 backend ke liye clean ISO
  //   };
  
  //   console.log("Final Payload:", payload);
  
  //   dispatch(updateTransactionById({ transactionId, data: payload }));
  //   onClose();
  // };
  
 

  // const onSubmit = (data) => {
  //   // console.log("Update Transaction:", transactionId);
  //   console.log(transaction);
  //   console.log(data);
  // //   dispatch(updateTransactionById({
  // //   transactionId,
  // //   data
  // // }))
  //   onClose();
  // };

  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white/90 p-6 rounded-2xl w-96 shadow-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Transaction</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Type</label>
            <select {...register("type", { required: "Type is required" })} className="w-full border rounded p-2">
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block mb-1 text-sm font-medium">Date & Time</label>
            <input
              type="datetime-local"
              {...register("date", { required: "Date is required" })}
              className="w-full border rounded p-2"
            />
            {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 text-sm font-medium">Amount</label>
            <input
              type="number"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be > 0" },
              })}
              className="w-full border rounded p-2"
            />
            {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
          </div>

          {/* Remark */}
          <div>
            <label className="block mb-1 text-sm font-medium">Remark</label>
            <input type="text" {...register("remark")} className="w-full border rounded p-2" />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}
