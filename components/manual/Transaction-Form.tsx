
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SheetClose } from "@/components/ui/sheet"
import { toast } from "sonner"
import { TransactionSchema } from "@/lib/validators/TransactionSchema";
import { TransactionData } from "@/app/types/TransactionData";
import CreateTransaction from "@/lib/http/Create-Transaction";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { categories } from "./Transaction-Updater";


const TransactionForm = () => {

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationKey:['create-transaction'],
    mutationFn: (data : TransactionData)=>CreateTransaction(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['get-transactions']})
      toast(
       'Transaction Added SuccessFully'
      )
    }
  })
  const onSubmit = (TransDet : z.infer<typeof TransactionSchema>) => {
    console.log("TransDet",TransDet);

    const TData = {
        amount: TransDet.amount,
        date: (TransDet.date), // Convert string to Date
        description: TransDet.description,
        category:TransDet.category
      };
    
    mutate(TData)
  }
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues:{
        description:"",
        amount:0,
        date: String(new Date())
    }
  });
  const {formState : {isValid,isValidating}} = form
  return (
    <div className="flex flex-col gap-6 p-2">
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Amount</FormLabel>
              <FormControl>
              <Input
                type="number"
                placeholder="Rs ."
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
              <Input
                    {...field}
                    type="date"
                    value={field.value ? field.value : ""} // Keep it as a string "YYYY-MM-DD"
                    onChange={(e) => field.onChange(e.target.value)} // Directly store as string
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    categories.map((ele,idx)=>{
                      return (<SelectItem key={idx} value={(ele.title).toString()}>
                        {ele.title}</SelectItem>)
                    })
                  }
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isValid? 
          (<SheetClose disabled={isValidating}  className="w-full" asChild>
        <Button type="submit" className="tracking-tighter w-full">Add</Button>
        </SheetClose> ) : (<Button type="submit" className="tracking-tighter w-full border-2 rounded-lg" variant={'default'}>Add</Button>)
        }
        </form>
     </Form>
    </div>
  );
};
export default TransactionForm;
