import { z } from "zod";

export const TransactionSchema = z.object({
    amount:z.number({message:"amount should be a number/price"}),
    description:z.string({message:"description should be a string"}).max(100,{message:"description should be less than 100 characters"}).min(3,{message:"description should be more than 3 characters"}),
    category:z.string({message:"category must be a string"}),
    date:z.string().min(10,{message:"Enter Valid Date"}).max(10,{message:"Enter Valid Date"}), 
})