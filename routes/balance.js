import express from 'express';
import balanceController from '../controllers/balanceController.js';
//balance routes
const router = express.Router();
const { getUserBalance } = balanceController;

// Route for user balance
//http://localhost:5002/api/balance/user/68c32d541328635110e809ac
router.get('/balance/user/:id', getUserBalance);

export default router;



