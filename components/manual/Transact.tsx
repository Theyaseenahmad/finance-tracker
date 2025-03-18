'use client'
import DashboardTable from "./Dashboard-Table"
import SheetRow from "./Sheet-Row"

export default function Transact() {
  return (
        <>
        <SheetRow></SheetRow>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
         <DashboardTable></DashboardTable>
        </div>
        </>
  )
}
