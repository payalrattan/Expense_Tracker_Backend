import express from 'express';
import incomeControllers from '../controllers/incomeController';
//income routes
const router = express.Router();
const {getAllIncome,getIncomeByID,createIncome,updateIncome,deleteIncome}=incomeControllers

router.get('/income',getAllIncome);
router.get('/income/:id',getIncomeByID);
router.post('/income',createIncome);
router.put('/income/:id,',updateIncome);
router.delete('/income/:id,',deleteIncome);

export default router;