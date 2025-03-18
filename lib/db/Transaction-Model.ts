import mongoose, { Schema, Document, Model } from "mongoose";

// ✅ Define TypeScript Interface for User
export interface ITransaction extends Document {
  amount : number,
  date: string,
  description: string,
  category:string,
  createdAt: Date;
}

// ✅ Define Mongoose Schema
const transactionSchema: Schema<ITransaction> = new Schema(
  {
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    category:{type:String ,required:true}
  },
  {
    timestamps: true, 
  }
);

const Transaction: Model<ITransaction> = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
