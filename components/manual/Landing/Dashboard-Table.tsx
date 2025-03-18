import React from 'react';
import { TransactionTable } from '../Transactions/Transaction-table';
import { columns } from '../Transactions/Transaction-Column';
import { useQuery } from '@tanstack/react-query';
import GetTransactions from '@/lib/http/Get-Transactions';
import { Loader2 } from 'lucide-react';
import MonthlyExpensesChart from '../Transactions/Single-Chart';

type Transaction = {
  date: string;
  amount: number;
};


const DashboardTable = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: GetTransactions,
  });

  // Function to aggregate transactions by date
  const aggregateDataByDay = (transactions: Transaction[]): { date: string; amount: number }[] => {
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

  // Ensure aggregatedData is always an array
  let aggregatedData: { date: string; amount: number }[] = [];

  if (data?.transactions) {
    console.log('Data:', data);
    aggregatedData = aggregateDataByDay(data.transactions);
  }

  if (isError)
    return <h1 className="text-destructive">Something went wrong</h1>;

  return (
    <div className="">
      {isLoading ? (
        <div className="h-screen rounded-lg w-full flex items-center justify-center text-white">
          <Loader2 className="animate-spin text-center size-12 mx-auto" />
        </div>
      ) : (
        <>
          <MonthlyExpensesChart data={aggregatedData} />
          <TransactionTable data={data?.transactions || []} columns={columns} />
        </>
      )}
    </div>
  );
};

export default DashboardTable;
