import Income from '../models/Income.js';

// @desc    Add new Income source
// @route   POST /api/v1/income/add
// @access  Private
export const addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both source and amount for income',
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    const newIncome = await Income.create({
      userId: req.user._id,
      icon: icon || '💰',
      source: source.trim(),
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
    });

    return res.status(201).json({
      success: true,
      message: 'Income added successfully',
      income: newIncome,
    });
  } catch (error) {
    console.error('Add Income Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error adding income',
    });
  }
};

// @desc    Get all Income records for user
// @route   GET /api/v1/income/get
// @access  Private
export const getAllIncome = async (req, res) => {
  try {
    const incomeList = await Income.find({ userId: req.user._id }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      count: incomeList.length,
      income: incomeList,
    });
  } catch (error) {
    console.error('Get All Income Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching income list',
    });
  }
};

// @desc    Delete Income record
// @route   DELETE /api/v1/income/:id
// @access  Private
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const income = await Income.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income record not found or not authorized to delete',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Income record deleted successfully',
    });
  } catch (error) {
    console.error('Delete Income Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting income',
    });
  }
};

// @desc    Download Income records (CSV)
// @route   GET /api/v1/income/downloadexcel
// @access  Private
export const downloadIncomeExcel = async (req, res) => {
  try {
    const incomeList = await Income.find({ userId: req.user._id }).sort({
      date: -1,
    });

    // CSV Header
    let csv = 'Source,Amount,Date\n';
    incomeList.forEach((item) => {
      csv += `"${item.source}",${item.amount},"${new Date(item.date).toLocaleDateString()}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('income-report.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Download Income CSV Error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error downloading income report',
    });
  }
};
