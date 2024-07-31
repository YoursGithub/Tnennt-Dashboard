import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const FeaturedStore = () => {
  const [featuredStores, setFeaturedStores] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedStores = JSON.parse(localStorage.getItem('featuredStores')) || [];
    setFeaturedStores(savedStores);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStore = { name: file.name, image: reader.result };
        const updatedStores = [newStore, ...featuredStores].slice(0, 6); // Keep only the latest 6 stores
        setFeaturedStores(updatedStores);
        localStorage.setItem('featuredStores', JSON.stringify(updatedStores));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      
      <div className="flex-grow bg-white shadow rounded-lg p-4 sm:p-6 m-4">
        <h4 className="text-gray-900 text-xl font-semibold mb-4">Featured Stores</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {featuredStores.map((store, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
              <img 
                src={store.image} 
                alt={store.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">{store.name}</h5>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <label 
            htmlFor="upload-store" 
            className="cursor-pointer inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Upload Store
            <input
              id="upload-store"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FeaturedStore;