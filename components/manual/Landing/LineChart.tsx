"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



export default function TotalExpenseChart({data: transactions}) {


    const groupedData = transactions.reduce((acc, { date, amount }) => {
        acc[date] = (acc[date] || 0) + amount;
        return acc;
      }, {});
      
      // Convert to array and sort by date
      const chartData = Object.entries(groupedData)
        .map(([date, total]) => ({ date, total }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="w-full h-48 bg-white p-4 rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}  >
          <XAxis  tickMargin={10} dataKey="date" tick={{ fontSize: 10 }}/>
          <YAxis tick={{ fontSize: 10 }}/>
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
