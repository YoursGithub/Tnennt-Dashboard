import React, { useState } from 'react';
import { FiSearch, FiChevronDown, FiMoreHorizontal, FiMenu } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar";


const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#001d3d]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-8 flex bg-gray-900">
  <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 mr-4">
    {/* Orders section content */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <button 
          className="text-white mr-4 lg:hidden" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>
      <div className='flex'>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2 text-sm">↓ Import</button>
        <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded flex items-center text-sm">
          Export
        </button>
      </div>
    </div>

    {/* Filters */}
    <div className="flex mb-4 text-sm">
      <button className="mr-2 p-2 border border-gray-600 rounded flex items-center text-gray-300">
        Type <FiChevronDown className="ml-1" />
      </button>
      <button className="mr-2 p-2 border border-gray-600 rounded flex items-center text-gray-300">
        Status <FiChevronDown className="ml-1" />
      </button>
      <button className="mr-2 p-2 border border-gray-600 rounded flex items-center text-gray-300">
        Order date <FiChevronDown className="ml-1" />
      </button>
      <button className="p-2 border border-gray-600 rounded flex items-center text-gray-300">
        All filters <FiChevronDown className="ml-1" />
      </button>
    </div>

    {/* Table */}
    <table className="w-full text-sm text-gray-300">
      <thead>
        <tr className="border-b text-center border-gray-700">
          <th className="text-left p-2 font-normal text-gray-400"></th>
          <th className="text-left p-2 font-normal text-gray-400">Order</th>
          <th className="text-left p-2 font-normal text-gray-400">Customer</th>
          <th className="text-left p-2 font-normal text-gray-400">Type</th>
          <th className="text-left p-2 font-normal text-gray-400">Payment Status</th>
          <th className="text-left p-2 font-normal text-gray-400">Total</th>
          <th className="text-left p-2 font-normal text-gray-400">Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-700">
          <td className="p-2"><input type="checkbox" className="bg-gray-700 border-gray-600" /></td>
          <td className="p-2 text-blue-400">#192541</td>
          <td className="p-2 flex items-center">
            Esther Howard
          </td>
          <td className="p-2">Shipping</td>
          <td className="p-2"><span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">Paid</span></td>
          <td className="p-2">$3,127.00</td>
          <td className="p-2">Jun 19</td>
          <td className="p-2"><FiMoreHorizontal className="text-gray-400" /></td>
        </tr>
        

        <tr className="border-b border-gray-700">
          <td className="p-2"><input type="checkbox" className="bg-gray-700 border-gray-600" /></td>
          <td className="p-2 text-blue-400">#192541</td>
          <td className="p-2 flex items-center">
            Esther Howard
          </td>
          <td className="p-2">Shipping</td>
          <td className="p-2"><span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">Paid</span></td>
          <td className="p-2">$3,127.00</td>
          <td className="p-2">Jun 19</td>
          <td className="p-2"><FiMoreHorizontal className="text-gray-400" /></td>
        </tr>

        <tr className="border-b border-gray-700">
          <td className="p-2"><input type="checkbox" className="bg-gray-700 border-gray-600" /></td>
          <td className="p-2 text-blue-400">#192541</td>
          <td className="p-2 flex items-center">
            Esther Howard
          </td>
          <td className="p-2">Shipping</td>
          <td className="p-2"><span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">Paid</span></td>
          <td className="p-2">$3,127.00</td>
          <td className="p-2">Jun 19</td>
          <td className="p-2"><FiMoreHorizontal className="text-gray-400" /></td>
        </tr>

        <tr className="border-b border-gray-700">
          <td className="p-2"><input type="checkbox" className="bg-gray-700 border-gray-600" /></td>
          <td className="p-2 text-blue-400">#192541</td>
          <td className="p-2 flex items-center">
            Esther Howard
          </td>
          <td className="p-2">Shipping</td>
          <td className="p-2"><span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">Paid</span></td>
          <td className="p-2">$3,127.00</td>
          <td className="p-2">Jun 19</td>
          <td className="p-2"><FiMoreHorizontal className="text-gray-400" /></td>
        </tr>
      </tbody>
    </table>
  </div>

        {/* Right sidebar */}
        {/* <aside className="w-80">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xs font-semibold mb-4 text-gray-500">RECEIPT OF GOODS</h2>
            <div className="text-3xl font-bold mb-4">$2.2m</div>
            <div className="text-sm text-gray-500 mb-4">242 orders</div>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-semibold">$864,600</div>
                <div className="text-gray-500">95 shipments</div>
              </div>
              <div>
                <div className="font-semibold">$1.34m</div>
                <div className="text-gray-500">147 pickups</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold text-gray-500">ORDERS STATUS</h2>
              <button className="text-xs text-blue-600">Active</button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Paid</span>
                <span className="text-sm text-green-500">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cancelled</span>
                <span className="text-sm text-red-500">8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Refunded</span>
                <span className="text-sm text-gray-500">3%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold text-gray-500">OVERVIEW</h2>
              <button className="text-xs text-gray-500 flex items-center">
                This month <FiChevronDown className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">$2,246.75</div>
                  <div className="text-sm text-gray-500">Average order</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$2.2m</div>
                  <div className="text-sm text-gray-500">Total revenue</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">16 min</div>
                  <div className="text-sm text-gray-500">Processing time</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">1.7</div>
                  <div className="text-sm text-gray-500">Avg. items/order</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">0.32%</div>
                  <div className="text-sm text-gray-500">Pending orders</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">0.51%</div>
                  <div className="text-sm text-gray-500">Repeat rate</div>
                </div>
              </div>
            </div>
          </div>
        </aside> */}
      </main>
    </div>
    </div>
  );
};

export default Orders;