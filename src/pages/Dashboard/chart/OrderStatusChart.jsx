import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const orderStatusData = [
  { name: "Pending", value: 100 },
  { name: "Completed", value: 500 },
  { name: "Canceled", value: 70 },
];

const COLORS = ["#ffcc00", "#4cd964", "#ff4444"];

const OrderStatusChart = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Status</h2>
      <div className="flex items-center justify-center">
        <PieChart width={400} height={300}>
          <Pie
            data={orderStatusData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {orderStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </>
  );
};
export default OrderStatusChart;
