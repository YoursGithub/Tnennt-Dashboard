import React, { useState } from 'react';

function MiddlemanSection() {
  const [selectedUser, setSelectedUser] = useState(null);

  const middlemen = [
    {
      id: 'MM001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      status: 'Active',
      aadhar: '1234 5678 9012',
      pan: 'ABCDE1234F'
    },
    {
      id: 'MM002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+91 9876543211',
      status: 'Inactive',
      aadhar: '2345 6789 0123',
      pan: 'BCDEF2345G'
    },
    {
      id: 'MM003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+91 9876543212',
      status: 'Active',
      aadhar: '3456 7890 1234',
      pan: 'CDEFG3456H'
    },
    {
      id: 'MM004',
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      phone: '+91 9876543213',
      status: 'Active',
      aadhar: '4567 8901 2345',
      pan: 'DEFGH4567I'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Middleman Section</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {middlemen.map((user) => (
          <div 
            key={user.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => setSelectedUser(user)}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">ID: {user.id}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: {user.email}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {user.status}
            </span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{selectedUser.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">ID: {selectedUser.id}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: {selectedUser.email}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Phone: {selectedUser.phone}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Status: {selectedUser.status}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Aadhar: {selectedUser.aadhar}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">PAN: {selectedUser.pan}</p>
            <button 
              onClick={() => setSelectedUser(null)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MiddlemanSection;