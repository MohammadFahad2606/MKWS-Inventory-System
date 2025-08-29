import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransactionById } from "@/redux/productSlice";
import TransactionModal from "./TransactionModal";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function TransactionList({ transactions }) {
  const dispatch = useDispatch();
  const [editingTx, setEditingTx] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Open confirmation dialog
  const handleOpenDialog = (t) => {
    setSelectedTransaction(t);
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  // Confirm delete with Toast
  const confirmDelete = async () => {
    try {
      await dispatch(deleteTransactionById(selectedTransaction._id)).unwrap();
      toast.success("Transaction deleted successfully!");
      handleCloseDialog();
    } catch (err) {
      toast.error(err || "Failed to delete transaction");
    }
  };

  return (
    <div className="space-y-4">
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this transaction?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={handleCloseDialog}>
            No
          </Button>
          <Button variant="gradient" color="red" onClick={confirmDelete}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Transaction List */}
      {transactions.map((t) => {
        const dateObj = new Date(t.date);

        return (
          <div
            key={t._id}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {/* Date & Day */}
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-700">{dateObj.getDate()}</p>
                <p className="text-xs bg-orange-400 text-white rounded px-2 py-1">
                  {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {/* Transaction Info */}
              <div>
                <p className={`text-lg font-bold ${t.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                  {t.amount} {t.type}
                </p>
                <p className="text-sm text-gray-500">{t.remark}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTx(t)}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenDialog(t)}
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal open if editing */}
      {editingTx && (
        <TransactionModal
          transaction={editingTx}
          transactionId={editingTx._id}
          onClose={() => setEditingTx(null)}
        />
      )}
    </div>
  );
}



// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deleteTransactionById } from "@/redux/productSlice";
// import TransactionModal from "./TransactionModal";

// export default function TransactionList({transactions }) {
//   const dispatch = useDispatch();
//   const [editingTx, setEditingTx] = useState(null);

//   const handleDelete = (t) => {
//     console.log("Delete Transaction:", t._id);
  
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       dispatch(deleteTransactionById(t._id));  // 👈 sirf string bhejna hai
//     }
//   };
  

//   return (
//     <div className="space-y-4">


// <Dialog open={openDialog} handler={handleCloseDialog}>
//   <DialogHeader>Confirm Delete</DialogHeader>
//   <DialogBody divider>
//     Are you sure you want to delete this transaction?
//   </DialogBody>
//   <DialogFooter>
//     <Button variant="text" color="gray" onClick={handleCloseDialog}>
//       No
//     </Button>
//     <Button variant="gradient" color="red" onClick={confirmDelete}>
//       Yes
//     </Button>
//   </DialogFooter>
// </Dialog>


//       {transactions.map((t) => {
//         const dateObj = new Date(t.date);

//         return (
//           <div
//             key={t._id}
//             className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between"
//           >
//             <div className="flex items-center space-x-4">
//               {/* Date & Day */}
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-gray-700">{dateObj.getDate()}</p>
//                 <p className="text-xs bg-orange-400 text-white rounded px-2 py-1">
//                   {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {dateObj.toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>

//               {/* Transaction Info */}
//               <div>
//                 <p className={`text-lg font-bold ${t.type === "IN" ? "text-green-600" : "text-red-600"}`}>
//                   {t.amount} {t.type}
//                 </p>
//                 <p className="text-sm text-gray-500">{t.remark}</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setEditingTx(t)}
//                 className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(t)}
//                 className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       {/* Modal open if editing */}
//       {editingTx && (
//         <TransactionModal
//           transaction={editingTx}
//           transactionId={editingTx._id}
//           onClose={() => setEditingTx(null)}
//         />
//       )}
//     </div>
//   );
// }
