import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { TrendingUpIcon, PlusIcon } from '../../components/Icons';

const Income = () => {
  return (
    <DashboardLayout activeMenu="income">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
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
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Income</span>
            </button>
          </div>
        </div>

        {/* Placeholder Content Area */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center shadow-xs flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <TrendingUpIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Income Records Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Start tracking your earnings by clicking the "Add Income" button above.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;