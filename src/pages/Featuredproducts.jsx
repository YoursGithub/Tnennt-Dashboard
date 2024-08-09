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
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getDocument } from "../Database/db";
import { doc , getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const Featuredproducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getFeaturedProducts = async () =>{
    
    const products = await getDocument("Featured Products/featured-products")
    
    const storeDetails = [];

    for (const ref of products.products) {

      // FIXME: correct it
      const docRef = doc(db,"products",ref);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        storeDetails.push(docSnap.data());
      }
    }

    setFeaturedProducts(storeDetails);

  }

  console.log(featuredProducts);
  useEffect(() => {
    getFeaturedProducts();

  }, []);

  

  return (
    <>

    <div className="flex">
        <div>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">

    <Navbar />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 m-7">
        <div className="bg-[#141519] w-[700px] shadow-xl rounded-lg p-6">
          <h4 className="text-2xl font-semibold mb-4 text-white">
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
              <>
              <SwiperSlide key={index}>
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <img
                    src={product?.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {product.name}
                  </p>
                </div>
              </SwiperSlide>
              </>
            ))}
          </Swiper>

        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Featuredproducts;
