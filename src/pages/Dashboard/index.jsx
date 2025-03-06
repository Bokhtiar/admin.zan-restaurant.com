import OrdersChart from "./chart/OrdersChart";
import OrderStatusChart from "./chart/OrderStatusChart";
import RevenueChart from "./chart/RevenueChart";
import TopSellingChart from "./chart/TopSellingChart";

export const Dashboard = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl mt-5 font-bold">Dashboard</h1>
        <p className="mt-4">Welcome to the admin panel.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3  gap-6">
          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl font-bold mt-2">15000</p>
          </div>

          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Revenue </h2>
            <p className="text-2xl font-bold mt-2">10000</p>
          </div>

          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Pending Order</h2>
            <p className="text-2xl font-bold mt-2">100</p>
          </div>
          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Complete Order</h2>
            <p className="text-2xl font-bold mt-2">500</p>
          </div>
          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Canceled Orders</h2>
            <p className="text-2xl font-bold mt-2">70%</p>
          </div>
          <div className="bg-[#4cd964] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Top Selling Items</h2>
            <p className="text-2xl font-bold mt-2">Tea</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="w-full">
            <OrdersChart />
          </div>
          <div className="w-full">
            <RevenueChart />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="w-full ">
          <OrderStatusChart/>
          </div>
          <div className="w-full">
            <TopSellingChart />
          </div>
        </div>

      </div>
    </>
  );
};
