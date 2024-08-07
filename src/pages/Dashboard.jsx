import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [customerTimePeriod, setCustomerTimePeriod] = useState("Today");
  const [orderTimePeriod, setOrderTimePeriod] = useState("Today");
  const [revenueTimePeriod, setRevenueTimePeriod] = useState("Today");
  const [currentSection, setCurrentSection] = useState("dashboard");

  const getDataForTimePeriod = (data, period) => {
    return data;
  };

  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ];

  const orderData = [
    { name: "Mon", orders: 120 },
    { name: "Tue", orders: 150 },
    { name: "Wed", orders: 200 },
    { name: "Thu", orders: 180 },
    { name: "Fri", orders: 220 },
    { name: "Sat", orders: 250 },
    { name: "Sun", orders: 190 },
  ];

  const productData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Books", value: 200 },
    { name: "Home", value: 100 },
  ];

  const visitorData = [
    { name: "Week 1", visitors: 4000 },
    { name: "Week 2", visitors: 3000 },
    { name: "Week 3", visitors: 5000 },
    { name: "Week 4", visitors: 4500 },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const dashboardData = {
    customers: 1234,
    orders: 567,
    revenue: {
      weekly: 12500,
      monthly: 50000,
      total: 1000000,
    },
    products: {
      total: 100,
      quantity: 5000,
      stores: 5,
    },
    visitors: {
      daily: 1000,
      weekly: 7000,
      monthly: 30000,
      yearly: 365000,
    },
    recentOrders: [
      {
        customerName: "John Doe",
        productName: "Laptop",
        price: "$999",
        location: "New York",
        orderStatus: "Shipped",
      },
      {
        customerName: "Jane Smith",
        productName: "Smartphone",
        price: "$699",
        location: "Los Angeles",
        orderStatus: "Processing",
      },
      {
        customerName: "Bob Johnson",
        productName: "Headphones",
        price: "$149",
        location: "Chicago",
        orderStatus: "Delivered",
      },
      {
        customerName: "Alice Brown",
        productName: "Tablet",
        price: "$299",
        location: "Houston",
        orderStatus: "Pending",
      },
      {
        customerName: "Charlie Wilson",
        productName: "Smart Watch",
        price: "$199",
        location: "Miami",
        orderStatus: "Shipped",
      },
    ],
  };

  return (
      <div className={`flex ${darkMode ? "dark" : ""}`}>
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800">
      <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#141519]">
          {currentSection === "dashboard" && (
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium mb-6">
                Dashboard Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className=" bg-[#21242D] shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                      Total Customers
                    </h4>
                    <select
                      value={customerTimePeriod}
                      onChange={(e) => setCustomerTimePeriod(e.target.value)}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 text-white focus:ring-indigo-500"
                    >
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {dashboardData.customers}
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                      data={getDataForTimePeriod(
                        revenueData,
                        customerTimePeriod
                      )}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#21242D] shadow rounded-lg p-6">
                  <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                    Total Orders
                  </h4>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {dashboardData.orders}
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={orderData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#21242D] shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold">
                      Revenue
                    </h4>
                    <select
                      value={revenueTimePeriod}
                      onChange={(e) => setRevenueTimePeriod(e.target.value)}
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 text-white focus:ring-indigo-500"
                    >
                      <option value="Today">Today</option>
                      <option value="Yesterday">Yesterday</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Total: ${dashboardData.revenue.total}
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart
                      data={getDataForTimePeriod(
                        revenueData,
                        revenueTimePeriod
                      )}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                  <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">
                    Products
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Products: {dashboardData.products.total}
                  </p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={productData}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Recent Orders Table */}
          <div className="mt-8">
            <h4 className="text-gray-700 border-gray-700 dark:text-gray-200 text-xl font-medium mb-4 ml-7">
              Recent Orders
            </h4>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden m-5">
              <table className="min-w-full border divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr className="">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Order Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {dashboardData.recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {order.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {order.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {order.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  order.orderStatus === "Shipped"
                    ? "bg-green-100 text-green-800"
                    : order.orderStatus === "Processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.orderStatus === "Delivered"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
