import React, { useState, useEffect } from 'react';
import CustomerTable from '../components/CustomersTable';
import Sidebar from '../components/Sidebar';

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
    // Add more customer objects here
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
    <div className={`flex flex-col md:flex-row ${darkMode ? 'bg-[#141519]' : 'bg-blue-100'} min-h-screen`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} darkMode={darkMode} />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            className="md:hidden mr-2 text-white"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>Customers</h1>
        </div>
        <CustomerTable customers={customers} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default CustomersPage;