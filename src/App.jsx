import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
// import Revenue from './pages/Revenue';
// import Products from './pages/Products';
// import ProductTracking from './pages/ProductTracking';
// import ReturnsRefundsCancellations from './pages/ReturnsRefundsCancellations';
// import Visitors from './pages/Visitors';
import Middleman from './pages/Middleman';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        {/* <Route path="/revenue" element={<Revenue />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-tracking" element={<ProductTracking />} />
        <Route path="/returns-refunds-cancellations" element={<ReturnsRefundsCancellations />} />
        <Route path="/visitors" element={<Visitors />} /> */}
        <Route path="/middleman" element={<Middleman />} />
      </Routes>
    </Router>
  );
}

export default App;