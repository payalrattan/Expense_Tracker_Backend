import { calculateTotalExpenses } from '../controllers/expenseController.js';
import { calculateTotalIncome } from '../controllers/incomeController.js';

const balanceController = {
    getUserBalance: async (req, res) => {
        const { id } = req.params;
        try {
            // Calculate user's total income, total expenses, and balance
            const totalIncome = await calculateTotalIncome(id);
            const totalExpenses = await calculateTotalExpenses(id);
            //Calculate balance
            const balance = totalIncome - totalExpenses;

            res.status(200).json({
                userId: id,
                totalIncome,
                totalExpenses,
                balance
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

export default balanceController;
