
import { TransactionData } from "@/app/types/TransactionData"
import { ColumnDef } from "@tanstack/react-table"


export const RecentColumns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
]
