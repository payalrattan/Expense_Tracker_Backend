import express from 'express';
import incomeControllers from '../controllers/incomeController.js';

const router = express.Router();
const {
  getAllIncome,
  getIncomeById,
  getUserIncome,
  getIncomeBySource,
  createIncome,
  updateIncome,
  deleteIncome
} = incomeControllers;
router.get('/income', getAllIncome);
router.get('/income/:id', getIncomeById);
router.get('/income/user/:id', getUserIncome);
router.get('/income/source/:source', getIncomeBySource);
router.post('/income', createIncome);
router.put('/income/:id', updateIncome);
router.delete('/income/:id', deleteIncome);

export default router;
