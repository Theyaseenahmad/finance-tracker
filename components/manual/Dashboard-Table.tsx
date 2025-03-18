import React from 'react'
import { TransactionTable } from './Transaction-table'
import { columns } from './Transaction-Column'
import { useQuery } from '@tanstack/react-query'
import GetTransactions from '@/lib/http/Get-Transactions'
import { Loader2 } from 'lucide-react'
import MonthlyExpensesChart from './Single-Chart'

const DashboardTable = () => {
  const {data,isError,isLoading} = useQuery({
    queryKey:['get-transactions'],
    queryFn:GetTransactions
})

//data.transactions is an array having objects {amount,}


const aggregateDataByDay = (transactions: any[]) => {
  const aggregatedData: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    const { date, amount } = transaction;
    if (aggregatedData[date]) {
      aggregatedData[date] += amount;
    } else {
      aggregatedData[date] = amount;
    }
  });

  return Object.keys(aggregatedData).map((date) => ({
    date,
    amount: aggregatedData[date],
  }));
};

let aggregatedData;

if(data){
  console.log('dataaaaa',data);
  
   aggregatedData = aggregateDataByDay(data.transactions);

}



console.log('data',data);



if(isError) return (
  <>
  <h1 className='text-destructive'>Something went wrong</h1>
  </>
)

  return (
    <div className=''>
    {isLoading? <div className='h-screen rounded-lg w-full flex items-center justify-center text-white'><Loader2 className='animate-spin text-center size-12 mx-auto'/></div> :<> <MonthlyExpensesChart data={aggregatedData} />
    <TransactionTable data={data.transactions || []} columns={columns}></TransactionTable>
    </> }
      
  </div>
    
  )
}

export default DashboardTable