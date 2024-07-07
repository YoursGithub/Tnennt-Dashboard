import React from 'react';

const CustomerTable = ({ customers, darkMode }) => {
  return (
    <div>
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className={`w-full ${darkMode ? 'text-white' : 'text-blue-900'}`}>
          <thead>
            <tr className={`${darkMode ? 'bg-blue-800' : 'bg-blue-200'}`}>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Email</th>
              <th className="p-2">Products Purchased</th>
              <th className="p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className={`${darkMode ? 'border-blue-700' : 'border-blue-300'} border-b`}>
                <td className="p-2">{customer.id}</td>
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.mobile}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.productsPurchased}</td>
                <td className="p-2">{customer.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="md:hidden space-y-4 text-white">
        {customers.map((customer) => (
          <div key={customer.id} className={`p-4 rounded-lg ${darkMode ? 'bg-[#21242D]' : 'bg-blue-200'}`}>
            <h3 className="font-bold">{customer.name}</h3>
            <p>ID: {customer.id}</p>
            <p>Mobile: {customer.mobile}</p>
            <p>Email: {customer.email}</p>
            <p>Products Purchased: {customer.productsPurchased}</p>
            <p>Location: {customer.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;