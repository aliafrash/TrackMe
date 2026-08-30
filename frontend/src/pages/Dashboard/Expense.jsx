import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TransactionCard from '../../components/Cards/TransactionCard';
import AddExpenseModal from '../../components/Modals/AddExpenseModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import { TrendingDownIcon, PlusIcon, UploadIcon } from '../../components/Icons';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../utils/apiPaths';
import { addThousandsSeparator } from '../../utils/helper';

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch all Expense records
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data && response.data.expenses) {
        setExpenseList(response.data.expenses);
      }
    } catch (error) {
      console.error('Failed to fetch expense records:', error);
      toast.error('Failed to load expense data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Total Expense sum calculation
  const totalExpense = expenseList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Trigger Delete Modal
  const handleOpenDelete = (id) => {
    setSelectedExpenseId(id);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!selectedExpenseId) return;

    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(selectedExpenseId)
      );

      if (response.data.success) {
        toast.success('Expense record deleted');
        setExpenseList((prev) => prev.filter((item) => item._id !== selectedExpenseId));
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete expense:', error);
      toast.error('Failed to delete expense record');
    } finally {
      setDeleteLoading(false);
      setSelectedExpenseId(null);
    }
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}${API_PATHS.EXPENSE.DOWNLOAD_EXPENSE}?token=${token}`;
    window.open(url, '_blank');
  };

  return (
    <DashboardLayout activeMenu="expense">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Expense Manager 📉
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Keep track of your daily expenses and categorize your spendings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {expenseList.length > 0 && (
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition cursor-pointer shadow-2xs"
              >
                <UploadIcon className="w-4 h-4 rotate-180 text-slate-500" />
                <span>Export CSV</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-rose-200 transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-tr from-rose-600 to-pink-500 rounded-2xl p-6 text-white shadow-lg shadow-rose-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-rose-100 block mb-1">
              Total Recorded Expenses
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              -${addThousandsSeparator(totalExpense)}
            </h2>
            <span className="text-xs text-rose-100/90 mt-1.5 inline-block">
              Across {expenseList.length} recorded expense item{expenseList.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <TrendingDownIcon className="w-7 h-7" />
          </div>
        </div>

        {/* Expense Items List */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">All Expenses</h3>

          {loading ? (
            <div className="flex items-center justify-center p-12 bg-white border border-slate-200/80 rounded-2xl">
              <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : expenseList.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <TrendingDownIcon className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No Expenses Recorded Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                Log your daily spendings by clicking the "Add Expense" button above.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-rose-200 transition cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Your First Expense</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {expenseList.map((item) => (
                <TransactionCard
                  key={item._id}
                  id={item._id}
                  title={item.category}
                  amount={item.amount}
                  date={item.date}
                  icon={item.icon}
                  type="expense"
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchExpenses}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Expense Record"
        description="Are you sure you want to delete this expense entry? This will update your total balance."
        loading={deleteLoading}
      />
    </DashboardLayout>
  );
};

export default Expense;