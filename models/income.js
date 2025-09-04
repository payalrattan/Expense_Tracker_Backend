import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,

        },
        source: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        description: {
            type: String,
        }
    },
    { timestamps: true }
);

const Income = mongoose.model('Income', incomeSchema);
export default Income;
