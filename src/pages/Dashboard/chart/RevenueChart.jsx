import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 7000 },
  { month: "Apr", revenue: 10000 },
];

const RevenueChart = () => {
  return (
    <>
    <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="revenue" stroke="#4cd964" fill="#4cd964" />
      </AreaChart>
    </ResponsiveContainer>
    </>
  );
};
export default RevenueChart;
