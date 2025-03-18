import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type ExpenseData = {
  date: string;
  amount: number;
};

const MonthlyExpensesChart = ({ data }: { data: ExpenseData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300} className="bg-white p-4 rounded-lg">
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
          dataKey="date"
          interval={0} // Show all labels
          dy={15} // Adjust vertical position
          tick={{ fontSize: 10 }}
          angle={-45} // Rotate labels by 45 degrees
          label={{ fill: "rgba(0, 0, 0, 0.3)" }}
        />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const dataPoint = payload[0]?.payload as ExpenseData;
              return (
                <div
                  style={{
                    background: "#fff",
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  <p className="text-xs">Date: {dataPoint.date}</p>
                  <p>Amount: ₹{dataPoint.amount}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpensesChart;
