import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is authenticated (you might want to implement a more robust check)
//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [navigate]);
  const dashboardData = {
    customers: 1234,
    orders: 567,
    revenue: {
      weekly: 12500,
      monthly: 50000,
      total: 1000000
    },
    products: {
      total: 100,
      quantity: 5000,
      stores: 5
    },
    visitors: {
      daily: 1000,
      weekly: 7000,
      monthly: 30000,
      yearly: 365000
    },
    recentOrders: [
        { customerName: "John Doe", productName: "Laptop", price: "$999", location: "New York", orderStatus: "Shipped" },
        { customerName: "Jane Smith", productName: "Smartphone", price: "$699", location: "Los Angeles", orderStatus: "Processing" },
        { customerName: "Bob Johnson", productName: "Headphones", price: "$149", location: "Chicago", orderStatus: "Delivered" },
        { customerName: "Alice Brown", productName: "Tablet", price: "$299", location: "Houston", orderStatus: "Pending" },
        { customerName: "Charlie Wilson", productName: "Smart Watch", price: "$199", location: "Miami", orderStatus: "Shipped" },
      ]
  };


  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 dark:bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
`}>
  <div className="p-4">
    <h1 className="text-2xl font-semibold mt-4 mb-6">Dashboard</h1>
    <button 
        onClick={() => setSidebarOpen(false)} 
        className="p-2 rounded-md lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    <nav>
      <ul className="space-y-4 mt-20">
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Customers
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Orders
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Revenue
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            Products
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Product Tracking
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
            </svg>
            Returns, Refunds and Cancellations
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Visitors
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Middlemen
          </a>
        </li>
      </ul>
    </nav>
  </div>
</aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Navigation Bar */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="px-4 text-gray-500 dark:text-gray-200 focus:outline-none focus:text-gray-700 lg:hidden"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                {/* Search Button */}
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Notification Button */}
                <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                {/* Dark Mode Toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:shadow-outline"
                >
                  {darkMode ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>

                {/* Profile */}
                <div className="ml-4 relative flex-shrink-0">
                  <div>
                    <button className="bg-gray-800 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/150" alt="User profile" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-700">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium mb-6">Dashboard Overview</h3>
            
            {/* Dashboard Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Customers */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">Total Customers</h4>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{dashboardData.customers}</p>
              </div>

              {/* Orders */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">Total Orders</h4>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{dashboardData.orders}</p>
              </div>

              {/* Revenue */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">Revenue</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekly: ${dashboardData.revenue.weekly}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly: ${dashboardData.revenue.monthly}</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">Total: ${dashboardData.revenue.total}</p>
                </div>
              </div>

              {/* Products */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">Products</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Products: {dashboardData.products.total}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Quantity: {dashboardData.products.quantity}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stores: {dashboardData.products.stores}</p>
                </div>
              </div>

              {/* Visitors */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h4 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-2">Website Visitors</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Daily: {dashboardData.visitors.daily}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weekly: {dashboardData.visitors.weekly}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly: {dashboardData.visitors.monthly}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Yearly: {dashboardData.visitors.yearly}</p>
                </div>
              </div>
            </div>
          </div>


          {/* Recent Orders Table */}
<div className="mt-8">
  <h4 className="text-gray-700 border-gray-700 dark:text-gray-200 text-xl font-medium mb-4 ml-7">Recent Orders</h4>
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden m-5">
    <table className="min-w-full border divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr className=''>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order Status</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {dashboardData.recentOrders.map((order, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.customerName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.productName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{order.location}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${order.orderStatus === 'Shipped' ? 'bg-green-100 text-green-800' : 
                  order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                  order.orderStatus === 'Delivered' ? 'bg-blue-100 text-blue-800' : 
                  'bg-red-100 text-red-800'}`}>
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