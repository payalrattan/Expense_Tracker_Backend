import Income from '../models/income.js';

const incomeControllers = {
    // Get all income records
    //http://localhost:5002/api/income/
    
    getAllIncome: async (req, res) => {
        try {
            const income = await Income.find();
            res.status(200).json(income);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Get a single income by its _id
    //http://localhost:5002/api/income/68c4095ee94d61d76ff66fcc
    getIncomeById: async (req, res) => {
        const { id } = req.params; // id from URL parameter
        try {
            const income = await Income.findOne({ _id: id });
            if (income) {
                res.status(200).json(income);
            } else {
                res.status(404).json({ message: 'Income not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Get all income records for a specific user
    // http://localhost:5002/api/income/user/:id
    getUserIncome: async (req, res) => {
        const { id } = req.params; // userId
        try {
            const userIncome = await Income.find({ userId: id });

            if (!userIncome || userIncome.length === 0) {
                return res.status(404).json({ message: "No income found for this user" });
            }

            res.status(200).json(userIncome);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Get income by source
    //http://localhost:5002/api/income/source/Salary

    getIncomeBySource: async (req, res) => {
        const { source } = req.params;
        try {
            const incomes = await Income.find({ source: source });
            res.status(200).json(incomes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    // Create a new income record
    //http://localhost:5002/api/income
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
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    //Update existing expense
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
                res.status(400).json({ message: "All fields are required" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },

    // Delete an income record by _id
    //http://localhost:5002/api/income/68c5a918d86c2710e269cf55
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
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
};

export default incomeControllers;
