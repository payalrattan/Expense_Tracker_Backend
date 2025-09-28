import express from 'express';
import incomeControllers from '../controllers/incomeController.js';

const router = express.Router();
const {
  getAllIncome,
  getIncomeById,
  getUserIncome,
  getUserIncomeBySource,
  createIncome,
  updateIncome,
  deleteIncome
} = incomeControllers;
// Put user-specific routes FIRST
router.get('/income/user/:id/source/:source', getUserIncomeBySource);
router.get('/income/user/:id', getUserIncome);

// Then the generic routes
router.get('/income', getAllIncome);
router.get('/income/:id', getIncomeById);
router.post('/income', createIncome);
router.put('/income/:id', updateIncome);
router.delete('/income/:id', deleteIncome);

export default router;
