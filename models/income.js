import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, 
      required: true,
      min: 0,
      max: 1000000,
    },
    source: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);
export default Income;
