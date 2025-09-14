import Expense from '../models/expense.js';

const expenseControllers = {
    // Get all expenses 
    //http://localhost:5002/api/expenses
    getAllExpenses: async (req, res) => {
        try {
            const expense = await Expense.find();
            res.status(200).json(expense);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Get a single expense by its _id
    //http://localhost:5002/api/expenses/68c3ec2137381776c5ae3bc2
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

    // Get all expenses of a specific user
    //http://localhost:5002/api/expenses/user/68c32d541328635110e809ac
    getUserExpenses: async (req, res) => {
        const { id } = req.params;
        try {
            const userExpenses = await Expense.find({ userId: id });
            if (!userExpenses || userExpenses.length === 0) {
                return res.status(404).json({ message: "No expense found for this user" });
            }
            res.status(200).json(userExpenses);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error ' });
        }
    },
    // Get total expenses of a user
    //http://localhost:5002/api/expenses/user/68c32d541328635110e809ac/total
    getUserTotalExpenses: async (req, res) => {
        const { id } = req.params;
        try {
            const totalExpenses = await calculateTotalExpenses(id);
            res.status(200).json({ userId: id, totalExpenses });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Get expenses by category
    //http://localhost:5002/api/expenses/category/Food
    getExpensesByCategory: async (req, res) => {
        const { category } = req.params;
        try {

            const expenses = await Expense.find({ category });


            if (!expenses || expenses.length === 0) {
                return res.status(404).json({ message: "No expenses found for this category" });
            }

            res.status(200).json(expenses);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server Error" });
        }
    },


    // Create a new expense
    //http://localhost:5002/api/expenses
    createExpense: async (req, res) => {
        const { amount, category, description, date, userId } = req.body;
        try {
            if (amount && category && description && userId) {
                const newExpense = new Expense({
                    amount,
                    category,
                    description,
                    userId,
                    ...(date && { date })

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
    
    //Update existing expense
    //http://localhost:5002/api/expenses/68c5a918d86c2710e269cf55
    updateExpense: async (req, res) => {
        const { id } = req.params;
        const { amount, category, description, date } = req.body;
        try {
            if (amount && category) {
                const updatedExpense = await Expense.updateOne(
                    { _id: id },
                    { amount, category, description, date }
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

    // Delete an expense by its _id
    //http://localhost:5002/api/expenses/68c5a918d86c2710e269cf55
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
// Function to calculate total expenses of a user
export const calculateTotalExpenses = async (userId) => {
    // Find all expenses for the given user
    const expenses = await Expense.find({ userId });
    let total = 0;
    // Sum up the amount of each expense
    expenses.forEach(expense => {
        total += expense.amount;
    });
    return total; 
};