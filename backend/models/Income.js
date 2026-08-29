import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    icon: {
      type: String,
      default: '💰',
    },
    source: {
      type: String,
      required: [true, 'Income source is required'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Income amount is required'],
      min: [0, 'Amount must be positive'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model('Income', incomeSchema);

export default Income;
