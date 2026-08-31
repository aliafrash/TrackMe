import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TransactionCard from '../../components/Cards/TransactionCard';
import SavingsGoalCard from '../../components/Cards/SavingsGoalCard';
import AddIncomeModal from '../../components/Modals/AddIncomeModal';
import AddExpenseModal from '../../components/Modals/AddExpenseModal';
import IncomeExpenseChart from '../../components/Charts/IncomeExpenseChart';
import ExpenseDonutChart from '../../components/Charts/ExpenseDonutChart';
import { useUser } from '../../context/UserContext';
import {
  WalletIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusIcon,
  PieChartIcon,
} from '../../components/Icons';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { addThousandsSeparator } from '../../utils/helper';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days'); // '30days' | 'all'
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Fetch Dashboard aggregate statistics
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data && response.data.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalBalance = dashboardData?.totalBalance || 0;
  const totalIncome = dashboardData?.totalIncome || 0;
  const totalExpense = dashboardData?.totalExpense || 0;
  const recentTransactions = dashboardData?.recentTransactions || [];
  const expenseCategories = dashboardData?.expenseCategories || [];

  // Prepare chart series data
  const generateChartData = () => {
    const incomes = dashboardData?.last30DaysIncomes || [];
    const expenses = dashboardData?.last30DaysExpenses || [];

    const dateMap = {};

    incomes.forEach((item) => {
      const d = new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!dateMap[d]) dateMap[d] = { date: d, income: 0, expense: 0 };
      dateMap[d].income += item.amount;
    });

    expenses.forEach((item) => {
      const d = new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!dateMap[d]) dateMap[d] = { date: d, income: 0, expense: 0 };
      dateMap[d].expense += item.amount;
    });

    const chartArray = Object.values(dateMap);

    if (chartArray.length === 0 && (totalIncome > 0 || totalExpense > 0)) {
      return [
        {
          date: 'Summary',
          income: totalIncome,
          expense: totalExpense,
        },
      ];
    }

    return chartArray;
  };

  const chartData = generateChartData();

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
              Welcome back, <span className="font-semibold text-slate-700">{user?.fullName || 'User'}</span>! Here is your financial snapshot.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsIncomeModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Income</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpenseModalOpen(true)}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards + Savings Goal Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Net Balance */}
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-purple-200/50 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-purple-200">
                Net Balance
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white">
                <WalletIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-extrabold tracking-tight">
                ${addThousandsSeparator(totalBalance)}
              </h3>
              <span className="text-[10px] font-medium text-purple-100 bg-white/15 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                {totalBalance >= 0 ? '🟢 Surplus' : '🔴 Deficit'}
              </span>
            </div>
          </div>

          {/* Total Income */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Income
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-emerald-600 tracking-tight">
                +${addThousandsSeparator(totalIncome)}
              </h3>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Total revenue earned
              </span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Total Expenses
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <TrendingDownIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-rose-500 tracking-tight">
                -${addThousandsSeparator(totalExpense)}
              </h3>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Total spendings logged
              </span>
            </div>
          </div>

          {/* Savings Goal Card */}
          <SavingsGoalCard currentSavings={totalBalance} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expense Bar Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Income vs Expense Analytics
                </h3>
                <p className="text-xs text-slate-400">
                  Visual comparison of earnings and spendings
                </p>
              </div>
            </div>

            <IncomeExpenseChart data={chartData} />
          </div>

          {/* Donut Chart */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-primary flex items-center justify-center">
                <PieChartIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Expense Distribution
                </h3>
                <p className="text-xs text-slate-400">By category breakdown</p>
              </div>
            </div>

            <ExpenseDonutChart data={expenseCategories} />

            <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-slate-100">
              {expenseCategories.slice(0, 3).map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{cat._id}</span>
                  <span className="font-bold text-slate-800">
                    ${addThousandsSeparator(cat.totalAmount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Transactions
              </h3>
              <p className="text-xs text-slate-400">
                Your latest income & expense activity
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/income')}
              className="text-xs font-semibold text-primary hover:underline cursor-pointer"
            >
              View All Streams
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="w-7 h-7 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : recentTransactions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-700">No activity yet</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Record your first income or expense to see your feed.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {recentTransactions.map((tx) => (
                <TransactionCard
                  key={tx._id}
                  id={tx._id}
                  title={tx.source || tx.category}
                  amount={tx.amount}
                  date={tx.date}
                  icon={tx.icon}
                  type={tx.type}
                  hideDelete={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onSuccess={fetchDashboardData}
      />

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSuccess={fetchDashboardData}
      />
    </DashboardLayout>
  );
};

export default Home;