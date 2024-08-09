import React, { useState, useEffect } from 'react';
import CustomerTable from '../components/CustomersTable';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar";


const CustomersPage = () => {
  const customers = [
    {
      id: '192541',
      name: 'Esther Howard',
      mobile: '+1 (555) 123-4567',
      email: 'esther@example.com',
      productsPurchased: 5,
      location: 'New York, USA'
    },
    {
      id: '192541',
      name: 'Esther Howard',
      mobile: '+1 (555) 123-4567',
      email: 'esther@example.com',
      productsPurchased: 5,
      location: 'New York, USA'
    },
    {
      id: '192541',
      name: 'Esther Howard',
      mobile: '+1 (555) 123-4567',
      email: 'esther@example.com',
      productsPurchased: 5,
      location: 'New York, USA'
    },
    {
      id: '192541',
      name: 'Esther Howard',
      mobile: '+1 (555) 123-4567',
      email: 'esther@example.com',
      productsPurchased: 5,
      location: 'New York, USA'
    },
    {
      id: '192541',
      name: 'Esther Howard',
      mobile: '+1 (555) 123-4567',
      email: 'esther@example.com',
      productsPurchased: 5,
      location: 'New York, USA'
    },
    // ... (other customer objects)
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} darkMode={darkMode} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">

    <Navbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`flex items-center justify-between px-6 py-4 ${darkMode ? 'bg-[#141519]' : 'bg-white'} shadow-md`}>
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
              onClick={toggleSidebar}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
            <h1 className={`text-2xl font-semibold ml-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Customers
            </h1>
          </div>
          <div className="flex items-center">
            <button
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition duration-200 ease-in-out`}
            >
              Add Customer
            </button>
          </div>
        </header>

        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${darkMode ? 'bg-[#141519]' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6 py-8">
            <div className={` ${darkMode ? 'bg-gray-900' : ''} shadow-md rounded-lg overflow-hidden text-center`}>
              <CustomerTable customers={customers} darkMode={darkMode} />
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default CustomersPage;