import Expense from '../models/expense.js';
const expenseControllers = {
    
    getAllExpense: async (req, res) => {
        try {
            const expense = await Expense.find();
            res.status(200).json(expense);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getExpenseById: async (req, res) => {
        const { id } = req.params;
        try {
            const expense = await Expense.findOne({ _id: id });
            if (expense) {
                res.status(200).json(expense);
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    createExpense: async (req, res) => {
        const { amount, category, description,userId } = req.body;
        try {
            if (amount && category && description &&userId) {
                const newExpense = new Expense({
                    amount,
                    category,
                    description,
                    userId
        
                });
                await newExpense.save();
                res.status(201).json(newExpense);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    updateExpense: async (req, res) => {
        const { id } = req.params;
        const { amount, category, description } = req.body;
        try {
            if (amount && category&& description) {
                const updatedExpense = await Expense.updateOne(
                    { _id: id },
                    { amount, category, description }
                );
                if (updatedExpense.modifiedCount > 0) {
                    res.status(200).json({ message: 'Expense updated successfully' });
                } else {
                    res.status(404).json({ message: 'Expense not found' });
                }
            } else {
                res.status(400).json({ message: "All fields are required" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    deleteExpense: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedExpense = await Expense.deleteOne({ _id: id });
            if (deletedExpense.deletedCount > 0) {
                res.status(200).json({ message: 'Expense deleted successfully' });
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

export default expenseControllers;