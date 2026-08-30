import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CloseIcon, PlusIcon } from '../Icons';
import Input from '../Inputs/Input';
import EmojiSelector from '../Inputs/EmojiSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const AddIncomeModal = ({ isOpen, onClose, onSuccess }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [icon, setIcon] = useState('💰');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!source.trim()) {
      setError('Please enter the income source (e.g. Salary, Freelancing).');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon,
      });

      if (response.data.success) {
        toast.success('Income added successfully! 💰');
        setSource('');
        setAmount('');
        setIcon('💰');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Failed to add income:', err);
      const msg = err.response?.data?.message || 'Failed to add income record.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <PlusIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add New Income</h3>
              <p className="text-xs text-slate-400">Record an earning or revenue stream</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <EmojiSelector selectedEmoji={icon} onSelectEmoji={setIcon} />

          <Input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            label="Income Source"
            placeholder="e.g. Salary, Freelancing, Dividends"
            type="text"
          />

          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount ($)"
            placeholder="e.g. 2500"
            type="number"
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[13px] font-medium text-slate-800">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? 'Adding...' : 'Add Income'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal;
