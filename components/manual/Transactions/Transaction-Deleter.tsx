"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteTransaction from "@/lib/http/Delete-Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { TransactionData } from "@/app/types/TransactionData";

// Ensure _id is included
interface TransactionWithId extends TransactionData {
  _id?: string;
}

interface TransactionDeleterProps {
  row: Row<TransactionWithId>;
}

export function TransactionDeleter({ row }: TransactionDeleterProps) {
  const { original } = row;
  const [isOpen, setIsOpen] = useState(false);

  console.log("Deleting Transaction ID:", original._id);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-transaction"],
    mutationFn: (_id: string) => DeleteTransaction(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
      toast.success("Transaction deleted successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(original._id){
      mutate(original._id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
