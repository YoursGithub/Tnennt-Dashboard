import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


const Banner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [banners, setBanners] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const storedBanners = JSON.parse(localStorage.getItem("banners") || "[]");
    setBanners(storedBanners);
  }, []);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSaveBanner = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newBanner = {
          id: Date.now(),
          imageUrl: e.target.result,
        };
        const updatedBanners = [...banners, newBanner];
        setBanners(updatedBanners);
        localStorage.setItem("banners", JSON.stringify(updatedBanners));
        setShowUploadForm(false);
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>

    <div className="flex">

        <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>

   <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">

    <Navbar /> 
    
      <div className="relative p-6">
        <h2 className="text-2xl ml-3 font-bold mb-4 text-white">Banners</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.imageUrl}
              alt="Banner"
              className="w-48 h-auto object-cover rounded shadow-md"
            />
          ))}
        </div>

        <button
          className="absolute top-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowUploadForm(true)}
        >
          Create New Banner
        </button>

        {showUploadForm && (
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              className="mb-4"
            />
            <button
              onClick={handleSaveBanner}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Banner
            </button>
          </div>
        )}
      </div>
      </div>
      </div>
    </>
  );
};

export default Banner;
