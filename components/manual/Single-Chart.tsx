import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";


const MonthlyExpensesChart = ({ data }: { data: any[] }) => {
  return (
    
    <ResponsiveContainer width="100%" height={300} className={"bg-white p-4 rounded-lg"}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 20, // Increased bottom margin for rotated labels
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"// Rotate labels by 45 degree
            interval={0} // Show all labels
            dy={15} // Adjust vertical position
            tick={{ fontSize: 10 }} 
            angle={-45}
            
            label={
                { fill: "rgba(0, 0, 0, 0.3)",}
            }
          />
          <YAxis
          tick={{ fontSize: 10 }} 
           />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                return (
                  <div
                    style={{
                      background: "#fff",
                      padding: "10px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <p className="text-xs">Date: {payload[0].payload.date}</p>
                    <p>Amount: {payload[0].payload.amount}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="amount" fill="#8884d8"  />
        </BarChart>
      </ResponsiveContainer>
  
  );
};

export default MonthlyExpensesChart;
