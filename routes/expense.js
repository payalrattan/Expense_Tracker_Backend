import express from 'express';
import expenseControllers from '../controllers/expenseController.js';
//expense routes
const router = express.Router();
const { getAllExpenses, getExpenseById, getUserExpenses, getExpensesByCategory,createExpense, updateExpense, deleteExpense } = expenseControllers;

router.get('/expenses', getAllExpenses);
router.get('/expenses/:id', getExpenseById);
router.get('/expenses/user/:id', getUserExpenses);
router.get('/expenses/category/:category', getExpensesByCategory);
router.post('/expenses', createExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;