import React from "react";
import  { useState, useEffect } from "react";
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

const Featuredproducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredStores, setFeaturedStores] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("featuredProducts")) || [];
    const savedStores =
      JSON.parse(localStorage.getItem("featuredStores")) || [];
    setFeaturedProducts(savedProducts);
    setFeaturedStores(savedStores);
  }, []);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem = { name: file.name, image: reader.result };
        if (type === "product") {
          const updatedProducts = [...featuredProducts, newItem];
          setFeaturedProducts(updatedProducts);
          localStorage.setItem(
            "featuredProducts",
            JSON.stringify(updatedProducts)
          );
        } else if (type === "store") {
          const updatedStores = [...featuredStores, newItem];
          setFeaturedStores(updatedStores);
          localStorage.setItem("featuredStores", JSON.stringify(updatedStores));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>

    <div className="flex">
        <div>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>



      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 m-7">
        <div className="bg-white  shadow-xl rounded-lg p-6">
          <h4 className="text-2xl font-semibold mb-4">
            Featured Products
          </h4>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={2}
            navigation
            className="mb-4"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {product.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-4">
            <label
              htmlFor="upload-product"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Upload Product
              <input
                id="upload-product"
                type="file"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "product")}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Featuredproducts;
