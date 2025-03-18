import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
export interface IBudgetCategory extends Document {
  Education: string;
  Rent: string;
  Clothing: string;
  Other: string;
  Entertainment: string;
  Groceries: string;
  Healthcare: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const categoryBudgetSchema: Schema<IBudgetCategory> = new Schema(
  {
    Education: { type: String, required: true, default: "0" },
    Rent: { type: String, required: true, default: "0" },
    Clothing: { type: String, required: true, default: "0" },
    Entertainment: { type: String, required: true, default: "0" },
    Groceries: { type: String, required: true, default: "0" },
    Healthcare: { type: String, required: true, default: "0" },
    Other: { type: String, required: true, default: "0" },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists to avoid OverwriteModelError
const CategoryBudget: Model<IBudgetCategory> =
  mongoose.models.CategoryBudget ||
  mongoose.model<IBudgetCategory>("CategoryBudget", categoryBudgetSchema);

export default CategoryBudget;