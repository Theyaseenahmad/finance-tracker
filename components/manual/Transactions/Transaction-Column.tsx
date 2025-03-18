
import { TransactionData } from "@/app/types/TransactionData"
import { ColumnDef } from "@tanstack/react-table"
import { TransactionUpdater } from "./Transaction-Updater"
import { TransactionDeleter } from "./Transaction-Deleter"


export const columns: ColumnDef<TransactionData>[] = [
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
  {
    accessorKey: "update",
    header: "Update",
    cell:({row})=>{
      return <TransactionUpdater row={row}/>
    }
  },
  {
    accessorKey: "Delete",
    header: "Delete",
    cell:({row})=>{
      return <TransactionDeleter row={row}/>
    }
  },
]
