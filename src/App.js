import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './theme.css';
import './animations.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Inventory from './pages/Inventory';
import Food from './pages/Food';
import Grocery from './pages/Grocery';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import TestProfile from './pages/TestProfile';
import AuthPage from './pages/AuthPage';
import SeedData from './pages/SeedData';
import UpdateVegField from './pages/UpdateVegField';
import UpdateOffersField from './pages/UpdateOffersField';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <main className="App-main">
              <Routes>
                <Route path="/" element={<Inventory />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/food" element={<Food />} />
                <Route path="/grocery" element={<Grocery />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test-profile" element={<TestProfile />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/seed" element={<SeedData />} />
                <Route path="/update-veg" element={<UpdateVegField />} />
                <Route path="/update-offers" element={<UpdateOffersField />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
