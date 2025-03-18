import { z } from "zod";

export const TransactionUpdateSchema = z.object({
    amount:z.number({message:"amount should be a number/price"}),
    description:z.string({message:"description should be a string"}).max(100,{message:"description should be less than 100 characters"}).min(3,{message:"description should be more than 3 characters"}),
    date:z.string().min(10,{message:"Enter Valid Date"}).max(10,{message:"Enter Valid Date"}), 
    category:z.string({message:"category must be a string"}),
    id:z.string({message:"id should be a string"}),
})