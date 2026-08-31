import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CloseIcon, PlusIcon } from '../Icons';
import Input from '../Inputs/Input';
import EmojiSelector from '../Inputs/EmojiSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const QUICK_CATEGORIES = [
  '🍔 Food & Dining',
  '🏠 House Rent',
  '🚗 Transport / Fuel',
  '🛒 Groceries',
  '⚡ Electricity & Water',
  '🎬 Entertainment',
  '🏥 Medical & Health',
  '🛍️ Shopping',
];

const AddExpenseModal = ({ isOpen, onClose, onSuccess }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [icon, setIcon] = useState('💳');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelectQuickCategory = (catString) => {
    const parts = catString.split(' ');
    const emoji = parts[0];
    const name = parts.slice(1).join(' ');
    setCategory(name);
    setIcon(emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError('Please enter the expense category (e.g. Food, Rent, Transport).');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: category.trim(),
        amount: Number(amount),
        date,
        icon,
      });

      if (response.data.success) {
        toast.success('Expense recorded successfully! 📉');
        setCategory('');
        setAmount('');
        setIcon('💳');
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
      const msg = err.response?.data?.message || 'Failed to add expense record.';
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
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <PlusIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add New Expense</h3>
              <p className="text-xs text-slate-400">Record a spending or daily expense (LKR)</p>
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

        {/* Quick Category Chips */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-500 block mb-1.5">
            Quick Categories
          </label>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickCategory(cat)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-primary transition cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <EmojiSelector selectedEmoji={icon} onSelectEmoji={setIcon} />

          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category Name"
            placeholder="e.g. Groceries, Fuel, Keells"
            type="text"
          />

          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            label="Amount (Rs. / LKR)"
            placeholder="e.g. 6500"
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
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200 transition cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
