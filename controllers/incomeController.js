import Income from '../models/income.js';
const incomeControllers = {
    getAllIncome: async (req, res) => {
        try {
            const income = await Income.find();
            res.status(200).json(income);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    getIncomeById: async (req, res) => {
        const { id } = req.params;
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

    createIncome: async (req, res) => {
        const { amount, source, date, description } = req.body;
        try {
            if (amount && source && date && description) {
                const newIncome = new Income({
                    amount,
                    source,
                    ...(date && { date }),
                    description
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