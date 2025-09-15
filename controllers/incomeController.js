import Income from '../models/income.js';

const incomeControllers = {
    // ✅ Get all income records
    // GET http://localhost:5002/api/income/
    getAllIncome: async (req, res) => {
        try {
            const income = await Income.find();
            res.status(200).json(income);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // ✅ Get a single income by its _id
    // GET http://localhost:5002/api/income/:id
    getIncomeById: async (req, res) => {
        const { id } = req.params;
        try {
            const income = await Income.findById(id);
            if (!income) {
                return res.status(404).json({ message: 'Income not found' });
            }
            res.status(200).json(income);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // ✅ Get all income records for a specific user
    // GET http://localhost:5002/api/income/user/:id
    getUserIncome: async (req, res) => {
        const { id } = req.params; // userId
        try {
            const userIncome = await Income.find({ userId: id });
            if (!userIncome || userIncome.length === 0) {
                return res.status(404).json({ message: 'No income found for this user' });
            }
            res.status(200).json(userIncome);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // ✅ Get total income of a user
    // GET http://localhost:5002/api/income/user/:id/total
    getUserTotalIncome: async (req, res) => {
        const { id } = req.params;
        try {
            const incomes = await Income.find({ userId: id });
            const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

            res.status(200).json({ userId: id, totalIncome });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // ✅ Get income by source
    // GET http://localhost:5002/api/income/source/:source
    getIncomeBySource: async (req, res) => {
        const { source } = req.params;
        try {
            const income = await Income.find({ source });
            if (!income || income.length === 0) {
                return res.status(404).json({ message: 'No income found for this source' });
            }
            res.status(200).json(income);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // ✅ Create a new income record
    // POST http://localhost:5002/api/income
    createIncome: async (req, res) => {
        const { amount, source, date, description, userId } = req.body;
        try {
            if (amount && source && description && userId) {
                const newIncome = new Income({
                    amount,
                    source,
                    description,
                    userId,
                    ...(date && { date })
                });

                await newIncome.save();
                res.status(201).json(newIncome);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },

    // ✅ Update existing income
    // PUT http://localhost:5002/api/income/:id
    updateIncome: async (req, res) => {
        const { id } = req.params;
        const { amount, source, date, description } = req.body;
        try {
            if (amount && source && date && description) {
                const updatedIncome = await Income.updateOne(
                    { _id: id },
                    { amount, source, date, description }
                );

                if (updatedIncome.modifiedCount > 0) {
                    res.status(200).json({ message: 'Income updated successfully' });
                } else {
                    res.status(404).json({ message: 'Income not found' });
                }
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    },

    // ✅ Delete an income record by _id
    // DELETE http://localhost:5002/api/income/:id
    deleteIncome: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedIncome = await Income.deleteOne({ _id: id });
            if (deletedIncome.deletedCount > 0) {
                res.status(200).json({ message: 'Income deleted successfully' });
            } else {
                res.status(404).json({ message: 'Income not found' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

export default incomeControllers;

// ✅ Utility function to calculate total income for a user
export const calculateTotalIncome = async (userId) => {
    const incomes = await Income.find({ userId });
    return incomes.reduce((sum, income) => sum + income.amount, 0);
};
