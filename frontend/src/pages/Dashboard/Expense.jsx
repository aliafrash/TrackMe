import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { TrendingDownIcon, PlusIcon } from '../../components/Icons';

const Expense = () => {
  return (
    <DashboardLayout activeMenu="expense">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
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
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-rose-200 transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Placeholder Content Area */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
            <TrendingDownIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Expenses Recorded Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Log your daily expenses by clicking the "Add Expense" button above.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;