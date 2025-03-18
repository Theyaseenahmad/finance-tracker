'use client';

import BudgetManagement from '@/components/manual/Budget/Category-Budget';
import CompareChart from '@/components/manual/Budget/Compare-Chart';
import GetBudget from '@/lib/http/Get-Budget';
import GetTransactions from '@/lib/http/Get-Transactions';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Transaction = {
  category: string;
  amount: number;
  date: string;
};

type BudgetCategory = {
  [key: string]: number;
};

type BudgetVsActual = {
  category: string;
  budget: number;
  actual: number;
};

const Budget = () => {
  // Fetch transactions
  const { data: transactionsData, isLoading: isTransactionsLoading, isError: isTransactionsError } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: GetTransactions,
  });

  // Fetch budget data
  const { data: budgetData, isLoading: isBudgetLoading, isError: isBudgetError } = useQuery({
    queryKey: ['get-budget'],
    queryFn: GetBudget,
  });

  // Aggregate data by category
  const aggregateDataByCategory = (transactions: Transaction[]): { name: string; value: number }[] => {
    const aggregatedData: BudgetCategory = {};
    transactions.forEach(({ category, amount }) => {
      aggregatedData[category] = (aggregatedData[category] || 0) + amount;
    });

    return Object.keys(aggregatedData).map(category => ({
      name: category,
      value: aggregatedData[category],
    }));
  };

  const aggregatedData = transactionsData ? aggregateDataByCategory(transactionsData.transactions) : [];

  // Find highest spending category
  let highestCategory = '', highest = 0;
  if (aggregatedData.length) {
    const highestData = aggregatedData.reduce(
      (acc: { highest: number; highestCategory: string }, ele) =>
        ele.value > acc.highest ? { highest: ele.value, highestCategory: ele.name } : acc,
      { highest: 0, highestCategory: '' }
    );
    highest = highestData.highest;
    highestCategory = highestData.highestCategory;
  }

  // Find biggest transaction
  let highestAmount = 0, highestDate = '';
  if (transactionsData?.transactions?.length) {
    const highestTransaction = transactionsData.transactions.reduce(
      (acc: { highestAmount: number; highestDate: string }, t: Transaction) =>
        t.amount > acc.highestAmount ? { highestAmount: t.amount, highestDate: t.date } : acc,
      { highestAmount: 0, highestDate: '' }
    );
    highestAmount = highestTransaction.highestAmount;
    highestDate = highestTransaction.highestDate;
  }

  // Prepare budget vs actual comparison data
  let budgetVsActualData: BudgetVsActual[] = [];
  if (budgetData?.budget?.length) {
    const budgetCategories = Object.keys(budgetData.budget[0]).filter(key => key !== '_id' && key !== 'updatedAt');

    budgetVsActualData = budgetCategories.map(category => ({
      category,
      budget: parseFloat(budgetData.budget[0][category]) || 0,
      actual: aggregatedData.find(item => item.name === category)?.value || 0,
    }));
  }

  // Handle loading and error states
  if (isTransactionsLoading || isBudgetLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }
  if (isTransactionsError || isBudgetError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 text-white">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 bg-gradient-to-br from-purple-600 to-purple-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Left Column - Budget Management */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
          <BudgetManagement />
        </div>

        {/* Right Column - Budget vs Actual Chart & Spending Insights */}
        <div className="flex flex-col gap-6">
          
          {/* Budget vs Actual Comparison Chart */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Budget vs Actual Spending</h2>
            <CompareChart data={budgetVsActualData} />
          </div>

          {/* Spending Insights */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
            <div className="flex flex-col gap-2 text-sm md:text-lg">
              <h3 className="font-medium">{`📌 You spent the most on ${highestCategory}: ₹${highest}`}</h3>
              <h3 className="font-medium">{`💰 Your biggest transaction was ₹${highestAmount} on ${highestDate}`}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
