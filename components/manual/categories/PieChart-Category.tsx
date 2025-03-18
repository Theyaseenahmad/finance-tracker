'use client'

import GetTransactions from '@/lib/http/Get-Transactions';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


type TransactionTypeCategory = {
  _id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};


const PieChartCategory = () => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF3366", "#33FF57"];

    // Fetch transactions
    const { data, isLoading, isError } = useQuery({
      queryKey: ['get-transactions'],
      queryFn: GetTransactions,
    });
  
    // Aggregate data by category
    const aggregateDataByCategory = (transactions: TransactionTypeCategory[]) => {
      const aggregatedData: { [key: string]: number } = {};
  
      transactions.forEach((transaction) => {
        const { category, amount } = transaction;
        if (aggregatedData[category]) {
          aggregatedData[category] += amount;
        } else {
          aggregatedData[category] = amount;
        }
      });
  
      return Object.keys(aggregatedData).map((category) => ({
        name: category, // Category name
        value: aggregatedData[category], // Total amount for the category
      }));
    };
  
    // Handle loading and error states
    if (isLoading) {
  
      return <div className='bg-gradient-to-br from-purple-600 to-purple-900 text-white flex items-center justify-center w-full h-full'>
        <Loader2 className='text-center animate-spin'></Loader2>
      </div> ;
    }
  
    if (isError) {
      return <p className='bg-gradient-to-br from-purple-600 to-purple-900'>Error fetching data</p>;
    }
  
    // Check if data is available
    if (!data || !data.transactions) {
      return <p>No data available</p>;
    }
  
    // Aggregate the data
    console.log('data.transactionssssssss',data.transactions);
    
    const aggregatedData = aggregateDataByCategory(data.transactions);
    console.log(aggregatedData);  



  return (
    <div className='bg-gradient-to-br from-purple-600 to-purple-900 h-full w-full flex items-center justify-center '>
    <ResponsiveContainer width="90%" height={'80%'} className={"p-4 flex mx-auto my-auto items-center justify-center bg-white rounded-lg"}>
      <PieChart>
        <Pie
          data={aggregatedData} // Use aggregatedData here
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={130}
          fill="#8884d8"
          dataKey="value" // The key for the value of each slice
          nameKey="name" // The key for the name of each slice
          label={({ name, percent }) => {
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              return null; // Remove labels on mobile
            }
            return `${name} (${(percent * 100).toFixed(2)}%)`;
          }}
          
      
        >
          {aggregatedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
    </div>
  )
}

export default PieChartCategory