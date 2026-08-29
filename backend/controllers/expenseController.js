import Expense from '../models/Expense.js';

// @desc    Add new Expense
// @route   POST /api/v1/expense/add
// @access  Private
export const addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both category and amount for expense',
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    const newExpense = await Expense.create({
      userId: req.user._id,
      icon: icon || '💳',
      category: category.trim(),
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense: newExpense,
    });
  } catch (error) {
    console.error('Add Expense Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error adding expense',
    });
  }
};

// @desc    Get all Expense records for user
// @route   GET /api/v1/expense/get
// @access  Private
export const getAllExpense = async (req, res) => {
  try {
    const expenseList = await Expense.find({ userId: req.user._id }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      count: expenseList.length,
      expenses: expenseList,
    });
  } catch (error) {
    console.error('Get All Expense Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching expense list',
    });
  }
};

// @desc    Delete Expense record
// @route   DELETE /api/v1/expense/:id
// @access  Private
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense record not found or not authorized to delete',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Expense record deleted successfully',
    });
  } catch (error) {
    console.error('Delete Expense Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting expense',
    });
  }
};

// @desc    Download Expense records (CSV)
// @route   GET /api/v1/expense/downloadexcel
// @access  Private
export const downloadExpenseExcel = async (req, res) => {
  try {
    const expenseList = await Expense.find({ userId: req.user._id }).sort({
      date: -1,
    });

    // CSV Header
    let csv = 'Category,Amount,Date\n';
    expenseList.forEach((item) => {
      csv += `"${item.category}",${item.amount},"${new Date(item.date).toLocaleDateString()}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('expense-report.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Download Expense CSV Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error downloading expense report',
    });
  }
};
