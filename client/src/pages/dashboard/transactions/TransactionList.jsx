import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransactionById } from '@/redux/productSlice';
import TransactionModal from './TransactionModal';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';
import { toast } from 'react-toastify';

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
      toast.success('Transaction deleted successfully!');
      handleCloseDialog();
    } catch (err) {
      toast.error(err || 'Failed to delete transaction');
    }
  };

  return (
    <div className="space-y-4">
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader style={{ color: 'var(--color-foreground)' }}>
          Confirm Delete
        </DialogHeader>
        <DialogBody divider style={{ color: 'var(--color-mutedForeground)' }}>
          Are you sure you want to delete this transaction?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            style={{
              color: 'var(--color-mutedForeground)',
            }}
            onClick={handleCloseDialog}
          >
            No
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={confirmDelete}
            style={{
              backgroundColor: 'var(--color-destructive)',
              color: 'var(--color-primaryForeground)',
            }}
          >
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
            className="flex items-center justify-between rounded-2xl p-4 shadow-md"
            style={{
              backgroundColor: 'var(--color-card)',
              color: 'var(--color-foreground)',
            }}
          >
            <div className="flex items-center space-x-4">
              {/* Date & Day */}
              <div className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {dateObj.getDate()}
                </p>
                <p
                  className="rounded px-2 py-1 text-xs"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accentForeground)',
                  }}
                >
                  {dateObj.toLocaleDateString('en-US', { weekday: 'long' })}
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: 'var(--color-mutedForeground)' }}
                >
                  {dateObj.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Transaction Info */}
              <div>
                <p
                  className="text-lg font-bold"
                  style={{
                    color:
                      t.type === 'IN'
                        ? 'var(--color-success)'
                        : 'var(--color-destructive)',
                  }}
                >
                  {t.amount} {t.type}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-mutedForeground)' }}
                >
                  {t.remark}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTx(t)}
                className="rounded-md px-3 py-1"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primaryForeground)',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleOpenDialog(t)}
                className="rounded-md px-3 py-1"
                style={{
                  backgroundColor: 'var(--color-destructive)',
                  color: 'var(--color-primaryForeground)',
                }}
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
