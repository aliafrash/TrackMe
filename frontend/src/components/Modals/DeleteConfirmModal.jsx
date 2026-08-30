import React from 'react';
import { TrashIcon, CloseIcon } from '../Icons';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Record',
  description = 'Are you sure you want to delete this record? This action cannot be undone.',
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-100">
          <TrashIcon className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200 transition cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
