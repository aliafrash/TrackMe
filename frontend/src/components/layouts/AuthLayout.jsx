import React from 'react';
import { WalletIcon, TrendingUpIcon, PieChartIcon, ShieldCheckIcon } from '../Icons';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-screen bg-slate-50">
      {/* Left side - Auth Form */}
      <div className="w-full md:w-[58vw] lg:w-[50vw] xl:w-[45vw] min-h-screen flex flex-col justify-between p-8 sm:p-12 md:p-14 bg-white shadow-xl z-10 overflow-y-auto">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-white shadow-md shadow-purple-200">
              <WalletIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Track<span className="text-primary">Me</span>
              </h2>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Expense & Income Tracker (LKR)
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-[420px] mx-auto w-full">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} TrackMe Sri Lanka. Smart Personal Finance.
        </div>
      </div>

      {/* Right side - Visual Feature Showcase */}
      <div className="hidden md:flex flex-1 relative bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 p-12 items-center justify-center overflow-hidden">
        {/* Ambient Decorative Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-lg w-full z-10 flex flex-col gap-6">
          <div className="text-white mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-purple-100 border border-white/20 mb-4">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-300" />
              Smart Finance Management (LKR)
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Master Your Money with Precision & Ease
            </h1>
            <p className="text-purple-100/80 text-sm mt-3 leading-relaxed">
              Track daily expenses in Sri Lankan Rupees (LKR), visualize income trends, and achieve your financial freedom.
            </p>
          </div>

          {/* Glassmorphism Interactive Stats Card 1 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-white shadow-2xl transition hover:translate-y-[-2px] duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-emerald-300">
                  <TrendingUpIcon className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-purple-200">Total Net Balance</p>
                  <h3 className="text-xl font-bold tracking-tight">Rs. 185,000.00</h3>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                +14.8%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div className="bg-white/5 rounded-lg p-2.5">
                <span className="text-purple-200 block text-[11px]">Monthly Income</span>
                <span className="font-semibold text-emerald-300 text-sm">+Rs. 250,000</span>
              </div>
              <div className="bg-white/5 rounded-lg p-2.5">
                <span className="text-purple-200 block text-[11px]">Monthly Expenses</span>
                <span className="font-semibold text-rose-300 text-sm">-Rs. 65,000</span>
              </div>
            </div>
          </div>

          {/* Glassmorphism Card 2 */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white shadow-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-purple-200 shrink-0">
              <PieChartIcon className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Visual Analytics & Categorization</h4>
              <p className="text-xs text-purple-200 mt-0.5">
                Automatically organize your spendings in LKR with intuitive graphs and budgets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;