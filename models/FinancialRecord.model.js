// schema for trnsaction record
import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

const FinancialRecordModel = new mongoose.model(
  "FinancialRecord",
  RecordSchema
);

export default FinancialRecordModel;
