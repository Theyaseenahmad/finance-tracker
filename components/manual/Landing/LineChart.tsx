"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define TypeScript type for transactions
type Transaction = {
  date: string;
  amount: number;
};

type TotalExpenseChartProps = {
  data: Transaction[];
};

export default function TotalExpenseChart({ data: transactions }: TotalExpenseChartProps) {
  // Define the type explicitly for groupedData
  const groupedData: Record<string, number> = transactions.reduce<Record<string, number>>(
    (acc, { date, amount }) => {
      acc[date] = (acc[date] || 0) + amount;
      return acc;
    },
    {} // Initial value must match the defined type
  );

  // Convert to array and sort by date
  const chartData = Object.entries(groupedData)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="w-full h-48 bg-white p-4 rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis tickMargin={10} dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
