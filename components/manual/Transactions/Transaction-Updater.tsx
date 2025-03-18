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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import UpdateTransaction, { UpdatedData } from "@/lib/http/Update-transaction";
import { TransactionUpdateSchema } from "@/lib/validators/TransactionUpdateSchema";
import { BookOpen, Film, HeartPulse, Home, MoreHorizontal, Shirt, ShoppingCart } from "lucide-react";
import { TransactionData } from "@/app/types/TransactionData";
import { Row } from "@tanstack/react-table";

export const categories = [
  {
    title: "Groceries",
    url: "/groceries",
    icon: ShoppingCart, // Replace with the appropriate LucideIcon
    isActive: false, // Set to true if this category is active
  },
  {
    title: "Entertainment",
    url: "/entertainment",
    icon: Film, // Replace with the appropriate LucideIcon
    isActive: false,
  },
  {
    title: "Rent",
    url: "/rent",
    icon: Home, // Replace with the appropriate LucideIcon
    isActive: false,
  },
  {
    title: "Clothing",
    url: "/clothing",
    icon: Shirt, // Replace with the appropriate LucideIcon
    isActive: false,
  },
  {
    title: "Healthcare",
    url: "/healthcare",
    icon: HeartPulse, // Replace with the appropriate LucideIcon
    isActive: false,
  },
  {
    title: "Education",
    url: "/education",
    icon: BookOpen, // Replace with the appropriate LucideIcon
    isActive: false,
  },
  {
    title: "Other",
    url: "/other",
    icon: MoreHorizontal, // Replace with the appropriate LucideIcon
    isActive: false,
  },
];

interface TransactionWithId extends TransactionData {
  _id?: string;
}

interface TransactionDeleterProps {
  row: Row<TransactionWithId>;
}


export function TransactionUpdater({ row }: TransactionDeleterProps) {
  const { original } = row;
  const [isOpen, setIsOpen] = React.useState(false); // State to control dialog visibility

  const queryClient = useQueryClient();

  // Initialize React Hook Form with Zod validation
  const form = useForm<z.infer<typeof TransactionUpdateSchema>>({
    resolver: zodResolver(TransactionUpdateSchema),
    defaultValues: {
      description: original.description,
      amount: original.amount,
      date: original.date,
      category: original.category,
      id:original._id
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update-transaction"],
    mutationFn: (data: UpdatedData) => UpdateTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
      toast("Transaction updated successfully");
      setIsOpen(false); // Close the dialog on success
      form.reset(); // Reset the form after successful submission
    },
  });

  const onSubmit = (data: z.infer<typeof TransactionUpdateSchema>) => {
    console.log('submitting');
    
    const updatedData = {// Include the transaction ID for updating
      ...data, // Spread the form data (amount, description, category, date)
    };
    mutate(updatedData); // Pass the complete object to the mutation
  };

  console.log('Form errors:', form.formState.errors);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Make changes to the transaction here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Rs."
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
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

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((ele, idx) => (
                          <SelectItem key={idx} value={ele.title.toString()}>
                            {ele.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field */}
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
                      value={field.value ? field.value : ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}