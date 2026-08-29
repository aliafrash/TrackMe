import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUser } from '../../context/UserContext';
import { WalletIcon, TrendingUpIcon, TrendingDownIcon, PlusIcon } from '../../components/Icons';

const Home = () => {
  const { user } = useUser();

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dashboard Overview 📊
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, {user?.fullName || 'there'}! Here is your latest financial summary.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-primary hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-purple-200 transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Total Balance */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">Total Balance</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">$0.00</h3>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                All accounts combined
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-primary">
              <WalletIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Income */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">Total Income</span>
              <h3 className="text-2xl font-bold text-emerald-600 tracking-tight">$0.00</h3>
              <span className="text-[11px] text-slate-400 mt-1 inline-block">
                Active revenue sources
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUpIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Total Expenses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">Total Expenses</span>
              <h3 className="text-2xl font-bold text-rose-500 tracking-tight">$0.00</h3>
              <span className="text-[11px] text-slate-400 mt-1 inline-block">
                Total recorded spendings
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <TrendingDownIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;