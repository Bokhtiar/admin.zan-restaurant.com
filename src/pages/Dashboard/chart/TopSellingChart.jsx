import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const topSellingData = [
  { name: "Tea", sales: 200 },
  { name: "Burger", sales: 150 },
  { name: "Pizza", sales: 180 },
  { name: "Pasta", sales: 120 },
];

const TopSellingChart = () => {
  return (
    <>
    <h2 className="text-xl font-semibold mb-4">Top Selling Product</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topSellingData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#4cd964" />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};
export default TopSellingChart;
