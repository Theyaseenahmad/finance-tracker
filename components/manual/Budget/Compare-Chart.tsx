import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

type BudgetVsActual = {
  category: string;
  budget: number;
  actual: number;
};


const CompareChart = ({ data }: { data: BudgetVsActual[] }) => {

  console.log("chart datttaaaa",data);
  
  return (
    
  <ResponsiveContainer width="100%" height={300} className="">
          <BarChart 
          data={data} 
          margin={{ top: 10, left: -10, right: 0, bottom: 10 }} 
        >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="category"  
        angle={-30}
        tick={{ fontSize: 8 }}  
        tickMargin={10} 
        padding={{ left: 0, right: 0 }} // Increase padding to center bars
      />
      <YAxis tick={{ fontSize: 10 }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="budget" fill="#8884d8" name="Budget" />
      <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
    </BarChart>
  </ResponsiveContainer>


  

  );
};

export default CompareChart;