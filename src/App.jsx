import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Store from './pages/Store'
import Products from './components/Products';
import Middleman from './pages/Middleman';
import ProductTracking from './pages/ProductTracking';
import Featuredproducts from './pages/Featuredproducts';
import FeaturedStore from './pages/FeaturedStore';
import Banner from './pages/Banner';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Products />} />
        <Route path="/middleman" element={<Middleman />} />
        <Route path="/producttrack" element={<ProductTracking />} />
        <Route path="/featuredproducts" element={<Featuredproducts />} />
        <Route path="/featuredstore" element={<FeaturedStore />} />
        <Route path="/banners" element={<Banner />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;