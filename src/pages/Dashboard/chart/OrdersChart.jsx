import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const orderData = [
  { month: "Jan", orders: 500 },
  { month: "Feb", orders: 800 },
  { month: "Mar", orders: 1200 },
  { month: "Apr", orders: 1500 },
  { month: "May", orders: 2000 },
];

const OrdersChart = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={orderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#4cd964" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
