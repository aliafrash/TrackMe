import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TransactionCard from '../../components/Cards/TransactionCard';
import AddIncomeModal from '../../components/Modals/AddIncomeModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import { TrendingUpIcon, PlusIcon, UploadIcon } from '../../components/Icons';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS, BASE_URL } from '../../utils/apiPaths';
import { addThousandsSeparator } from '../../utils/helper';

const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch all Income records
  const fetchIncome = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data && response.data.income) {
        setIncomeList(response.data.income);
      }
    } catch (error) {
      console.error('Failed to fetch income records:', error);
      toast.error('Failed to load income data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  // Total Income sum calculation
  const totalIncome = incomeList.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Trigger Delete Modal
  const handleOpenDelete = (id) => {
    setSelectedIncomeId(id);
    setDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!selectedIncomeId) return;

    try {
      setDeleteLoading(true);
      const response = await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(selectedIncomeId)
      );

      if (response.data.success) {
        toast.success('Income record deleted');
        setIncomeList((prev) => prev.filter((item) => item._id !== selectedIncomeId));
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete income:', error);
      toast.error('Failed to delete income record');
    } finally {
      setDeleteLoading(false);
      setSelectedIncomeId(null);
    }
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const token = localStorage.getItem('token');
    const url = `${BASE_URL}${API_PATHS.INCOME.DOWNLOAD_INCOME}?token=${token}`;
    window.open(url, '_blank');
  };

  return (
    <DashboardLayout activeMenu="income">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Income Streams 💰
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Monitor and organize all your revenue, salary, and incoming finances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {incomeList.length > 0 && (
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
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Income</span>
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200/50 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-emerald-100 block mb-1">
              Total Accumulated Income
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              +${addThousandsSeparator(totalIncome)}
            </h2>
            <span className="text-xs text-emerald-100/90 mt-1.5 inline-block">
              Across {incomeList.length} recorded income source{incomeList.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <TrendingUpIcon className="w-7 h-7" />
          </div>
        </div>

        {/* Income Items List */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3">All Incomes</h3>

          {loading ? (
            <div className="flex items-center justify-center p-12 bg-white border border-slate-200/80 rounded-2xl">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : incomeList.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-10 text-center shadow-xs flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <TrendingUpIcon className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No Income Records Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                Start tracking your earnings by clicking the "Add Income" button above.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add Your First Income</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {incomeList.map((item) => (
                <TransactionCard
                  key={item._id}
                  id={item._id}
                  title={item.source}
                  amount={item.amount}
                  date={item.date}
                  icon={item.icon}
                  type="income"
                  onDelete={handleOpenDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddIncomeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchIncome}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Income Record"
        description="Are you sure you want to delete this income entry? This will update your total balance."
        loading={deleteLoading}
      />
    </DashboardLayout>
  );
};

export default Income;