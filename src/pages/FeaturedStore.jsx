import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getDocument } from "../Database/db";
import { getDoc , doc , collection } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../components/Navbar";


const FeaturedStore = () => {
  const [featuredStores, setFeaturedStores] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getFeaturedStores = async () =>{

   const storesRef = await getDocument(`Featured Stores/featured-stores`) ;

   const storeDetails = [];

      for (const ref of storesRef.stores) {

        const docRef = doc(db,"Stores",ref);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          storeDetails.push(docSnap.data());
        }
      }

      setFeaturedStores(storeDetails);
  }

  useEffect(() => {

    getFeaturedStores()
    
  }, []);

  
  return (
    <div className="flex flex-col lg:flex-row">
      <div>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-800">

    <Navbar />
      
      <div className="flex-grow bg-white shadow rounded-lg p-4 sm:p-6 m-4">
        <h4 className="text-gray-900 text-xl font-semibold mb-4">Featured Stores</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* loading screen */}
        {/* <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div> */}
          {featuredStores.map((store, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
           
              <div className="p-4">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200">{store.name}</h5>
              </div>
            </div>
          ))}
        </div>
     
      </div>
    </div>
    </div>
  );
};

export default FeaturedStore;