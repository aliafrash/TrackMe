import express from 'express';
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All Expense routes are protected with JWT
router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);

export default router;
