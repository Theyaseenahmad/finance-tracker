'use client'

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

export function TransactionDeleter({ row }: any) {
  const { original } = row;
  const [isOpen, setIsOpen] = useState(false);

  console.log('idd',original._id);
  

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete"],
    mutationFn: (_id: string) => DeleteTransaction(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
      toast("Transaction deleted successfully");
      setIsOpen(false);
    },
    onError: () => {
      toast("Failed to delete transaction");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(original._id);
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
            Are you sure you want to delete this transaction? This action cannot
            be undone.
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