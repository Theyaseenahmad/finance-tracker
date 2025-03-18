import { z } from "zod";

export const CategoryBudgetSchema = z.object({
    Rent: z.coerce.number().min(0, "Budget must be a positive number"),
    Clothing: z.coerce.number().min(0, "Budget must be a positive number"),
    Healthcare: z.coerce.number().min(0, "Budget must be a positive number"),
    Entertainment: z.coerce.number().min(0, "Budget must be a positive number"),
    Groceries: z.coerce.number().min(0, "Budget must be a positive number"),
    Education: z.coerce.number().min(0, "Budget must be a positive number"),
    Other: z.coerce.number().min(0, "Budget must be a positive number"),
  });