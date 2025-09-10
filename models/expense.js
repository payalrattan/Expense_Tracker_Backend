import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,

        },
        category: {
            type: String,
            required: true
        },
    
        description: {
            type: String,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
