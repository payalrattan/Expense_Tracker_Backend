import express from 'express';
import expenseControllers from '../controllers/expenseController.js';
//expense routes
const router = express.Router();
const { getAllExpense, getExpenseById, createExpense, updateExpense, deleteExpense } = expenseControllers;

router.get('/expense', getAllExpense);
router.get('/expense/:id', getExpenseById);
router.post('/expense', createExpense);
router.put('/expense/:id', updateExpense);
router.delete('/expense/:id', deleteExpense);

export default router;