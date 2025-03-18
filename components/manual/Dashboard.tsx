import React from 'react';
import { useQuery } from '@tanstack/react-query';
import GetTransactions from '@/lib/http/Get-Transactions';
import TotalExpenseChart from './LineChart';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TransactionTable } from './Transaction-table';
import { RecentColumns } from './Recent-Transactions-Column';

const Dashboard = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3366", "#33FF57"];


  const { data } = useQuery({
    queryKey: ['get-transactions'],
    queryFn: GetTransactions,
  });

  const aggregateDataByCategory = (transactions: any[]) => {
    const aggregatedData: { [key: string]: number } = {};
    transactions.forEach(({ category, amount }) => {
      aggregatedData[category] = (aggregatedData[category] || 0) + amount;
    });
    return Object.entries(aggregatedData).map(([name, value]) => ({ name, value }));
  };

  let totalExpense = 0;
  let aggregatedData: any[] = [];
  let recentTransactions: any[] = [];

  if (data) {
    totalExpense = data.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    recentTransactions = data.transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
    aggregatedData = aggregateDataByCategory(data.transactions);
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-900 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col gap-4">
        {/* Total Expenses */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Expense: Rs {totalExpense}</h3>
          {data && <TotalExpenseChart data={data.transactions} />}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-black">Most Recent Transactions</h3>
          {data && <TransactionTable data={recentTransactions} columns={RecentColumns} />}
        </div>
      </div>

      {/* Right Section - Category Breakdown */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
        <h3 className="text-lg font-semibold mb-2 text-black">Category Breakdown</h3>
        <div className="w-full flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="50%"
                innerRadius="20%"
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent, x, y, index }) => {
                  const isMobile = typeof window !== "undefined" && window.innerWidth < 768; // Check for mobile
                  const offset = 35;
                  const angle = Math.atan2(y - 200, x - 200);
                
                  return (
                    <text
                      x={x + Math.cos(angle) * offset}
                      y={y + Math.sin(angle) * offset}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                      fill={COLORS[index % COLORS.length]}
                      fontWeight="bold"
                    >
                      {isMobile ? `${Math.round(percent * 100)}%` : `${name} (${Math.round(percent * 100)}%)`}
                    </text>
                  );
                }}
                
              >
                {aggregatedData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ fontSize: "10px" }} />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
