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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CategoryBudgetType } from "@/app/types/CategoryBudgetType";
import SetCategoryBudget from "@/lib/http/Set-Category-budget";
import { CategoryBudgetSchema } from "@/lib/validators/CategoryBudgetSchema";
import GetBudget from "@/lib/http/Get-Budget";
import { Loader2 } from "lucide-react";

const BudgetManagement = () => {
  const queryClient = useQueryClient();

  // Fetch budget data
  const { data: budgetData, isLoading: isBudgetLoading, isError: isBudgetError } = useQuery({
    queryKey: ["get-budget"],
    queryFn: GetBudget,
  });

  // Extract budget values or set default to "1000"
  const defaultValues = {
    Rent: budgetData?.budget?.[0]?.Rent || "1000",
    Clothing: budgetData?.budget?.[0]?.Clothing || "1000",
    Healthcare: budgetData?.budget?.[0]?.Healthcare || "1000",
    Entertainment: budgetData?.budget?.[0]?.Entertainment || "1000",
    Groceries: budgetData?.budget?.[0]?.Groceries || "1000",
    Education: budgetData?.budget?.[0]?.Education || "1000",
    Other: budgetData?.budget?.[0]?.Other || "1000",
  };

  // Initialize the form with Zod resolver
  const form = useForm<z.infer<typeof CategoryBudgetSchema>>({
    resolver: zodResolver(CategoryBudgetSchema),
    defaultValues,
  });

  // Mutation for setting category budgets
  const { mutate } = useMutation({
    mutationKey: ["set-category-budget"],
    mutationFn: (data: CategoryBudgetType) => SetCategoryBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-budget"] });
      toast("Budget Saved Successfully");
    },
    onError: (error) => {
      console.error("Error saving budget:", error);
      toast("Failed to save budget");
    },
  });

  // Form submission handler
  const onSubmit = (data: z.infer<typeof CategoryBudgetSchema>) => {
    console.log("Budgets saved:", data);
    mutate(data);
  };

  // Handle loading and error states
  if (isBudgetLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isBudgetError) {
    return <div className="text-red-500">Error fetching budget data</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Set Monthly Budgets</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {["Rent", "Clothing", "Healthcare", "Entertainment", "Groceries", "Education", "Other"].map((category) => (
            <FormField
              key={category}
              control={form.control}
              name={category as keyof z.infer<typeof CategoryBudgetSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{category}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={`Enter ${category} budget`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full">
            Save Budgets
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BudgetManagement;
