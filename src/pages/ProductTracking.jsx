import React from 'react';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FiSearch, FiChevronDown, FiMoreHorizontal, FiMenu } from 'react-icons/fi';


const OrderStatus = ({ status }) => {
  const statusSteps = ['Ordered', 'Packed', 'Shipped', 'Delivered'];
  const currentStep = statusSteps.indexOf(status);

  return (
    <div className="flex justify-between items-center w-full">
      {statusSteps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
          }`}>
            {index <= currentStep && (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm mt-1">{step}</span>
        </div>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-900 rounded shadow-xl p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[17px] font-semibold text-white">{product.name}</h3>
        <span className="text-sm text-white">Order ID: {product.orderId}</span>
      </div>
      <p className=" mb-7 text-gray-400">Status: {product.status}</p>
      <OrderStatus status={product.status} />
    </div>
  );
};

const Dashboard = () => {
  const products = [
    { id: 1, name: 'Smartphone', orderId: 'ORD001', status: 'Shipped' },
    { id: 2, name: 'Laptop', orderId: 'ORD002', status: 'Packed' },
    { id: 3, name: 'Headphones', orderId: 'ORD003', status: 'Delivered' },
    { id: 4, name: 'Shirt', orderId: 'ORD004', status: 'Packed' },
    { id: 5, name: 'Headphones', orderId: 'ORD005', status: 'Delivered' },
    { id: 6, name: 'Headphones', orderId: 'ORD006', status: 'Delivered' },
    { id: 7, name: 'Headphones', orderId: 'ORD007', status: 'Delivered' },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <>

    <div className='flex'>
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    <div className="container mx-auto p-4 bg-[#141519]">

    <h1 className='text-white font-bold text-2xl mt-4'>All Orders  &nbsp; <span className='text-white'>&bull;</span></h1>
      <button 
          className="text-white mr-4 lg:hidden" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>



      <div className="grid grid-cols-1 text-white mt-10 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </div>

    </>
  );
};

export default Dashboard;