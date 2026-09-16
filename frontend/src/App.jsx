import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import About from "./pages/About/About.jsx";
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder.jsx';
import Footer from "./components/Footer/Footer";
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from "./pages/Verify/Verify.jsx";
import Myorders from './pages/Myorders/Myorders';
import OrderConfirmation from './pages/OrderConfirmation/OrderConfirmation.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import CartDrawer from './components/CartDrawer/CartDrawer.jsx';
import ActiveOrderWidget from './components/ActiveOrderWidget/ActiveOrderWidget.jsx';

const App = () => {
  const [showlogin, setShowlogin] = useState(false);

  return (
    <>
      {showlogin && <LoginPopup setShowlogin={setShowlogin} />}
      <CartDrawer />
      <ActiveOrderWidget />
      <ScrollToTop />

      <div className='app'>
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/'                  element={<Home />} />
          <Route path='/menu'              element={<Menu />} />
          <Route path='/about'             element={<About />} />
          <Route path='/cart'              element={<Cart />} />
          <Route path='/order'             element={
            <ProtectedRoute><Placeorder /></ProtectedRoute>
          } />
          <Route path='/verify'            element={<Verify />} />
          <Route path='/order-confirmation' element={<OrderConfirmation />} />
          <Route path='/myorders'          element={
            <ProtectedRoute><Myorders /></ProtectedRoute>
          } />
          <Route path='*'                  element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
