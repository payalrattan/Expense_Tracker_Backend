import express from 'express';
import incomeControllers from '../controllers/incomeController.js';
//income routes
const router = express.Router();
const { getAllIncome, getIncomeById, getUserTotalIncome, getUserIncome,getIncomeBySource, createIncome, updateIncome, deleteIncome } = incomeControllers
router.get('/income/:id', getIncomeById); 
router.get('/income/user/:id', getUserIncome);
router.get('/income/source/:source', getIncomeBySource);
router.get('/income/user/:id/total', getUserTotalIncome);
router.get('/income', getAllIncome);
router.post('/income', createIncome);
router.put('/income/:id', updateIncome);
router.delete('/income/:id', deleteIncome);

export default router;


