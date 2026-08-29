import Income from '../models/Income.js';
import Expense from '../models/Expense.js';

// @desc    Get aggregated Dashboard statistics, recent transactions & charts
// @route   GET /api/v1/dashboard
// @access  Private
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Calculate Total Income
    const totalIncomeResult = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].total : 0;

    // 2. Calculate Total Expenses
    const totalExpenseResult = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalExpense = totalExpenseResult.length > 0 ? totalExpenseResult[0].total : 0;

    // 3. Calculate Balance
    const totalBalance = totalIncome - totalExpense;

    // 4. Fetch Recent 5 Incomes and Recent 5 Expenses
    const recentIncomes = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    const recentExpenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    // 5. Combine & Sort Recent Transactions
    const combinedTransactions = [
      ...recentIncomes.map((item) => ({ ...item, type: 'income' })),
      ...recentExpenses.map((item) => ({ ...item, type: 'expense' })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    // 6. Expense Category Breakdown for Pie Charts
    const expenseCategories = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
      { $sort: { totalAmount: -1 } },
    ]);

    // 7. Last 30 Days Transactions for Chart Analytics
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const last30DaysIncomes = await Income.find({
      userId,
      date: { $gte: last30Days },
    }).sort({ date: 1 });

    const last30DaysExpenses = await Expense.find({
      userId,
      date: { $gte: last30Days },
    }).sort({ date: 1 });

    return res.status(200).json({
      success: true,
      totalBalance,
      totalIncome,
      totalExpense,
      recentTransactions: combinedTransactions.slice(0, 6),
      last30DaysIncomes,
      last30DaysExpenses,
      expenseCategories,
    });
  } catch (error) {
    console.error('Get Dashboard Data Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching dashboard analytics',
    });
  }
};
